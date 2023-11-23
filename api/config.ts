type Config = {
  APP_PORT: number;
  LOG_LEVEL: string;
};

const config: Config = {
  LOG_LEVEL: process.env.LOG_LEVEL!,
  APP_PORT: Number(process.env.APP_PORT!),
};

export default config;
export {
  Config,
};
