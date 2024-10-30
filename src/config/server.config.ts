import getEnvOrDefault from '@/utils/getEnvOrDefault';

export const SERVER_CONFIG = {
  port: getEnvOrDefault('PORT', 3333),
  host: getEnvOrDefault('HOST', '127.0.0.1')
}
export const SERVER_URL = `${SERVER_CONFIG.host}:${SERVER_CONFIG.port}`;