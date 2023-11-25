import config, { Config } from '../config';

export interface PokemonApiService {
  getSpecies: (name: string) => {},
  getEvolutionChain: (name: string) => {},
}

/**
 * User Management service
 * @param config configuration object
 * @param cache keep already received pokemon data
 * @constructor
 */
export const PokemonApiServiceFactory = (
  config: Config,
  cache: Map<string, Map<string, {}>>,
): PokemonApiService => {
  /**
   * Get species for pokemon name
   * @param name pokemon name
   */
  const getSpecies = (name: string): {} => {
    return {};
  }

  /**
   * Get evolution chain for pokemon
   * @param name  pokemon name
   */
  const getEvolutionChain = (name: string): {} => {
    return {};
  }

  return {
    getSpecies,
    getEvolutionChain,
  }
}

export default PokemonApiServiceFactory(
  config,
  new Map<string, Map<string, {}>>,
);
