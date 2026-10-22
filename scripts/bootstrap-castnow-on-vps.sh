#!/usr/bin/env bash
# Chạy trên VPS (Web console): cài đặt + clone + build + nginx + pm2 CastNow
set -euo pipefail

REPO_URL="${CASTNOW_REPO_URL:?Set CASTNOW_REPO_URL}"
SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:?}"
SUPABASE_ANON="${NEXT_PUBLIC_SUPABASE_ANON_KEY:?}"

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y nginx git curl ca-certificates

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
npm i -g pm2

mkdir -p /var/www /root/backups
cd /var/www
rm -rf castnow-src
git clone --depth 1 "$REPO_URL" castnow-src

ENV_WEB="NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON}
"
ENV_ADMIN="${ENV_WEB}NEXT_PUBLIC_ADMIN_DISPLAY_NAME=Support CastNow
"

deploy_app() {
  local src="$1" dest="$2" name="$3" port="$4"
  local stamp
  stamp="$(date +%Y%m%d%H%M%S)"
  local build="${dest}-build"
  rm -rf "$build"
  mkdir -p "$build"
  cp -a "$src"/. "$build"/
  printf '%s' "$5" >"$build/.env.local"
  cd "$build"
  npm ci
  npm run build
  pm2 delete "$name" >/dev/null 2>&1 || true
  if [[ -d "$dest" ]]; then
    mv "$dest" "/root/backups/${name}-${stamp}"
  fi
  mv "$build" "$dest"
  cd "$dest"
  pm2 start ecosystem.config.cjs
}

deploy_app /var/www/castnow-src/web /var/www/castnow-web castnow-web 3120 "$ENV_WEB"
deploy_app /var/www/castnow-src/admin-web /var/www/castnow-admin castnow-admin 3121 "$ENV_ADMIN"

cp /var/www/castnow-src/deploy/hostinger/nginx/castnow-web.conf /etc/nginx/sites-available/castnow-web
cp /var/www/castnow-src/deploy/hostinger/nginx/castnow-admin.conf /etc/nginx/sites-available/castnow-admin
ln -sfn /etc/nginx/sites-available/castnow-web /etc/nginx/sites-enabled/castnow-web
ln -sfn /etc/nginx/sites-available/castnow-admin /etc/nginx/sites-enabled/castnow-admin
nginx -t
systemctl reload nginx
pm2 save
pm2 startup systemd -u root --hp /root >/dev/null 2>&1 || true

ufw allow OpenSSH || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true

echo "=== DONE ==="
pm2 ls
ss -tlnp | grep -E '3120|3121|80' || true
curl -sI -H 'Host: www.castnowvietnam.com' http://127.0.0.1:3120 | head -n 5
curl -sI -H 'Host: admin.castnowvietnam.com' http://127.0.0.1:3121 | head -n 5
echo "Point Cloudflare A @/www/admin -> $(curl -4 -s ifconfig.me || echo VPS_IP)"
