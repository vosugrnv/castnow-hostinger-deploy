module.exports = {
  apps: [
    {
      name: "castnow-web",
      cwd: "/var/www/castnow-web",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3120",
      env: { NODE_ENV: "production", PORT: "3120" },
      max_memory_restart: "512M",
    },
  ],
};
