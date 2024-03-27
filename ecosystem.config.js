module.exports = {
  apps: [
    {
      name: 'test-api',
      script: 'tsc && node dist/server.js',

      instances: 1,
      exec_mode: 'fork',
      listen_timeout: 10000,

      env: {
        ENVIRONMENT: 'prod',
        NODE_ENV: 'production',
      },
    },
  ],
};
