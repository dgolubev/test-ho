import {
  Request,
  Response,
} from 'express';
import {
  PokemonController,
  PokemonControllerFactory,
} from '@app/controllers/pokemonController';
import { PokemonApiService } from '@app/services/pokemonApi';

// const mockPokemonApiService = jest.fn({});

describe('Pokemon Controller', () => {
  let sut: PokemonController;

  const mockReq = {} as Request;
  const mockRes = {} as Response;
  const mockNext = () => jest.fn();

  const mockGetEvolutionChain = jest.fn();

  beforeEach(async () => {
    jest.resetModules();
    jest.resetAllMocks();

    sut = PokemonControllerFactory(
      {
        getEvolutionChain: mockGetEvolutionChain,
        getSpecies: jest.fn(),
      } as PokemonApiService,
    );
  });

  describe('getEvolutionChain', () => {
    it('success', () => {
      mockReq.params = {
        name: 'dummyName',
      };
      mockRes.send = jest.fn();

      const expectResponse = 'expectResponse';

      mockGetEvolutionChain.mockImplementationOnce(() => expectResponse);

      sut.getEvolutionChain(mockReq, mockRes, mockNext);

      expect(mockRes.send).toBeCalledWith(expectResponse);

      expect(mockGetEvolutionChain).toBeCalledTimes(1);
      expect(mockGetEvolutionChain).toBeCalledWith( mockReq.params.name);
    });
  });
});
