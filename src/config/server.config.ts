import getEnvOrDefault from '@/utils/getEnvOrDefault';

export const SERVER_CONFIG = {
  port: getEnvOrDefault('PORT', 3333),
  host: getEnvOrDefault('HOST', '0.0.0.0')
}
export const SERVER_URL = `${SERVER_CONFIG.host}:${SERVER_CONFIG.port}`;