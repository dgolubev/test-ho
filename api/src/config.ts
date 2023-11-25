type Config = {
  APP_PORT: number;
  LOG_LEVEL: string;
  POKEMON_API_URL: string;
};

const config: Config = {
  LOG_LEVEL: process.env.LOG_LEVEL!,
  APP_PORT: Number(process.env.APP_PORT!),
  POKEMON_API_URL: process.env.POKEMON_API_URL!,
};

export default config;
export {
  Config,
};
