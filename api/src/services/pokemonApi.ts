import config, { Config } from '../config';
import { PokemonApiRoutes } from '@app/services/pokemonApiRoutes';
import {
  PokemonEvolutionChain,
  PokemonSpecies,
} from '@app/models/Pokemon';

export interface PokemonApiService {
  getSpecies: (name: string) => Promise<PokemonSpecies>,
  getEvolutionChain: (name: string) => Promise<PokemonEvolutionChain>,
}

/**
 * User Management service
 * @param config configuration object
 * @param fetchSrv fetch method
 * @param cache keep already received pokemon data
 * @constructor
 */
export const PokemonApiServiceFactory = (
  config: Config,
  fetchSrv: typeof fetch,
  cache: Map<string, {}>,
): PokemonApiService => {
  const self = {
  } as PokemonApiService ;

  /**
   * Get species for pokemon name
   * @param name pokemon name
   */
  self.getSpecies = async (name: string): Promise<PokemonSpecies> => {
    const cacheKey = `species_${name}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as PokemonSpecies;
    }

    //  fetch species
    const url = config.POKEMON_API_URL + PokemonApiRoutes.SPECIES + name;

    const res = await fetchSrv(url);
    const species = await res.json();

    //  save to cache
    cache.set(cacheKey, species);

    return species;
  }

  /**
   * Get evolution chain for pokemon
   * @param name  pokemon name
   */
  self.getEvolutionChain = async (name: string): Promise<PokemonEvolutionChain> => {
    const cacheKey = `evolution_chain_${name}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as PokemonEvolutionChain;
    }

    const species = await self.getSpecies(name);
    if (!species.evolution_chain?.url) {
      throw new Error('invalid pokemon species, can not find evolution chain');
    }

    const res = await fetchSrv(species.evolution_chain.url);
    const result = await res.json();

    //  set cache
    cache.set(cacheKey, result);

    return result;
  }

  return self;
}

export default PokemonApiServiceFactory(
  config,
  fetch,
  new Map<string, {}>,
);
