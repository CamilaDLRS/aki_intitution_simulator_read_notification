type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const levelPriority: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

export function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  if (levelPriority[level] < levelPriority[currentLevel]) return;
  const payload = { level, message, timestamp: new Date().toISOString(), ...meta };
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(payload));
}
