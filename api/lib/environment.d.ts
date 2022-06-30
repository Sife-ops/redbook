declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_KEY: string;
    }
  }
}

export {};
