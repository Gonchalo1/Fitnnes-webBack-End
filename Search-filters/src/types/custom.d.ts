declare module '*.json' {
    const value: any;
    export default value;
  }
  
  export interface SequelizeConfig {
    development: {
      username: string;
      password: string;
      database: string;
      host: string;
      dialect: string;
      use_env_variable?: string;
    };
    // Agrega otros entornos si es necesario
  }