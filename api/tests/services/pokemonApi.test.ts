global.fetch = jest.fn();

import { PokemonApiRoutes } from '@app/services/pokemonApiRoutes';
import {
  PokemonApiService,
  PokemonApiServiceFactory,
} from '@app/services/pokemonApi';

import { Config } from '@app/config';
import { PokemonSpecies } from '@app/models/Pokemon';

describe('Pokemon Api Service', () => {
  let sut: PokemonApiService;

  const mockConfig = {
    POKEMON_API_URL: 'dummyPokemonApiUrl',
  } as Config;

  const mockFetch = jest.fn();
  const mockJson = jest.fn() as jest.MockedFunction<any>;

  let mockCache = new Map();

  const pokemonName = 'dymmy';

  beforeEach(async () => {
    jest.resetAllMocks();
    jest.resetModules();

    mockCache = new Map();

    sut = PokemonApiServiceFactory(
      mockConfig,
      mockFetch,
      mockCache,
    );
  });

  describe('getSpecies', () => {
    const expectSpecies = { 'expectKey': 'dummyValue' };

    it('success', async () => {
      mockJson.mockResolvedValueOnce(expectSpecies as jest.ResolvedValue<any>);

      mockFetch.mockResolvedValueOnce({ json: mockJson } as Response);

      expect(await sut.getSpecies(pokemonName)).toBe(expectSpecies);
      //  check read from cache
      expect(await sut.getSpecies(pokemonName)).toBe(expectSpecies);

      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(mockConfig.POKEMON_API_URL + PokemonApiRoutes.SPECIES + pokemonName);
    });

    it('failure', async () => {
      expect.assertions(1);

      const expectReject = new Error('dummy error')
      mockFetch.mockRejectedValue(expectReject);

      await expect(sut.getSpecies(pokemonName)).rejects.toEqual(expectReject);
    });
  });

  describe('getEvolutionChain', () => {
    it('success', async () => {
      //  mock species method
      const expectSpecies = {
        evolution_chain: {
          url: 'dummyValue',
        },
      } as PokemonSpecies;
      sut.getSpecies = jest.fn().mockResolvedValueOnce(expectSpecies);

      //  mock fetching evolution chain
      const expectEvolutionChain = { 'expectKey': 'dummyValue' };
      mockJson.mockResolvedValueOnce(expectEvolutionChain as jest.ResolvedValue<any>);

      mockFetch.mockResolvedValueOnce({ json: mockJson } as Response);

      //  call
      expect(await sut.getEvolutionChain(pokemonName)).toEqual(expectEvolutionChain);
      //  check cache
      expect(await sut.getEvolutionChain(pokemonName)).toEqual(expectEvolutionChain);

      //  validate
      expect(sut.getSpecies).toBeCalledTimes(1);
      expect(sut.getSpecies).toBeCalledWith(pokemonName);

      expect(mockFetch).toBeCalledTimes(1);
      expect(mockFetch).toBeCalledWith(expectSpecies.evolution_chain.url);
    });

    it('failure, incorrect species', async () => {
      //  mock species method
      sut.getSpecies = jest.fn().mockResolvedValueOnce({} as PokemonSpecies);

      //  call
      await expect(sut.getEvolutionChain(pokemonName)).rejects.toThrow('invalid pokemon species,');
    });
  });
});
