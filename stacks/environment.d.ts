declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_KEY: string;
      REDBOOK_ENV: string;
      TOKEN_SECRET: string;
    }
  }
}

export {};
