module.exports = {
  apps: [
    {
      name: 'test-api',
      script: './dist/server.js',

      instances: 1,
      exec_mode: 'cluster',
      wait_ready: true,
      listen_timeout: 10000,

      env: {
        ENVIRONMENT: 'prod',
        NODE_ENV: 'production',
      },
    },
  ],
};
