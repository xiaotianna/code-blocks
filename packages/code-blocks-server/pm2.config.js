module.exports = {
  name: 'code-block-server',
  script: './dist/main.js',
  watch: false,
  ignore_watch: ['node_modules', 'logs'],
  instances: -1, // 按电脑cpu核数最大启动多个进程
  exec_mode: 'cluster', // 集群模式
  error_file: './logs/pm2-error.log',
  out_file: './logs/pm2-out.log',
  log_date_format: 'YYYY-MM-DD HH:mm:ss',
  max_memory_restart: '1G', // 内存超过1G重启
  max_restarts: 10, // 最大重启次数
  autorestart: true, // 发生异常自动重启
};
