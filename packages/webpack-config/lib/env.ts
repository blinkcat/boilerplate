export type ENV = 'development' | 'production';

export function isDev(env: ENV) {
  return env === 'development';
}

export function isProd(env: ENV) {
  return env === 'production';
}
