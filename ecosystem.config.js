module.exports = {
  apps: [{
    name: 'api-cbb',
    script: '/root/cbb/app/api_cbb.js',
    append_env_to_name: true,
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 3,
    merge_logs: true,
    time: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_development: {
      NODE_ENV: 'development',
    },
    env_staging: {
      NODE_ENV: 'staging',
    },
    env_production: {
      NODE_ENV: 'production',
    },
    env_sandbox: {
      NODE_ENV: 'sandbox',
    }
  }],
};
