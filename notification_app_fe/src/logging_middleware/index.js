const LOG_LEVELS = ['info', 'warn', 'error'];

export function log(level, message, meta = {}) {
  if (!LOG_LEVELS.includes(level)) throw new Error('Invalid log level');
  const logEntry = {
    level,
    message,
    meta,
    timestamp: new Date().toISOString(),
  };
  let logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push(logEntry);
  localStorage.setItem('logs', JSON.stringify(logs));
}
