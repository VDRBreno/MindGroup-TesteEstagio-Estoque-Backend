export default function getEnvOrDefault<T>(env: string, value: T) {
  if(process.env[env]) {
    if(typeof value==='string')
      return process.env[env] as T;

    if(!isNaN(+process.env[env]))
      return +process.env[env] as T;
  }
  
  return value as T;
}