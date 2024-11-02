import env from './env';

export default function getEnvOrDefault<T>(key: string, value: T) {
  if(env[key]) {
    if(typeof value==='string')
      return env[key] as T;

    if(!isNaN(+env[key]))
      return +env[key] as T;
  }
  
  return value as T;
}