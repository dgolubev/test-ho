import pokemonApiService, { PokemonApiService } from '@app/services/pokemonApi';

describe('Pokemon Api Service', () => {
  let sut: PokemonApiService;

  beforeEach(async () => {
    sut = pokemonApiService;
  });

  describe('getSpecies', () => {
    it('success', () => {
      expect(sut.getSpecies('dymmy')).toStrictEqual({});
    });
  });

  describe('getEvolutionChain', () => {
    it('success', () => {
      expect(sut.getEvolutionChain('dymmy')).toStrictEqual({});
    });
  });
});
