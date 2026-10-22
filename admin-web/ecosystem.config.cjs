module.exports = {
  apps: [
    {
      name: "castnow-admin",
      cwd: "/var/www/castnow-admin",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3121",
      env: { NODE_ENV: "production", PORT: "3121" },
      max_memory_restart: "512M",
    },
  ],
};
