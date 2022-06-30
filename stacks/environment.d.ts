declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_DATABASE: string;
      POSTGRES_HOST: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_PORT: string;
      POSTGRES_USERNAME: string;
      PUBLIC_KEY: string;
    }
  }
}

export {};
