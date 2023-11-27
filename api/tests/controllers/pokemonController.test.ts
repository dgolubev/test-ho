global.fetch = jest.fn();

import {
  Request,
  Response,
} from 'express';
import {
  PokemonController,
  PokemonControllerFactory,
} from '@app/controllers/pokemonController';
import { PokemonApiService } from '@app/services/pokemonApi';
import {
  PokemonEvolutionChain,
  PokemonEvolutionChainBranch,
} from '@app/models/Pokemon';

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
      } as unknown as PokemonApiService,
    );
  });

  describe('getEvolutionChain', () => {
    it('success', async () => {
      //  predefine mocks
      mockReq.params = {
        name: 'dummyName',
      };
      mockRes.json = jest.fn();

      const branchAB = {
        species: {
          name: 'branchAB',
        },
        evolves_to: [] as PokemonEvolutionChainBranch[],
      } as PokemonEvolutionChainBranch;

      const branchAC = {
        species: {
          name: 'branchAC',
        },
        evolves_to: [] as PokemonEvolutionChainBranch[],
      } as PokemonEvolutionChainBranch;

      const branchA = {
        species: {
          name: 'branchA',
        },
        evolves_to: [
          branchAB,
          branchAC,
        ],
      } as PokemonEvolutionChainBranch

      const branchB = {
        species: {
          name: 'branchB',
        },
        evolves_to: [] as PokemonEvolutionChainBranch[],
      } as PokemonEvolutionChainBranch;

      const expectResponse = {
        species: {
          name: 'branchMain',
        },
        evolves_to: [
          branchA,
          branchB,
        ],
      } as PokemonEvolutionChainBranch;

      mockGetEvolutionChain.mockImplementationOnce(() => ({
        chain : expectResponse
      } as PokemonEvolutionChain));

      //  call
      await sut.getEvolutionChain(mockReq, mockRes, mockNext);

      //  validate
      expect(mockRes.json).toBeCalledTimes(1);
      expect(mockRes.json).toBeCalledWith({
        name: 'branchMain',
        variations: [
          {
            name: branchA.species.name,
            variations: [
              {
                name: branchAB.species.name,
                variations: [],
              },
              {
                name: branchAC.species.name,
                variations: [],
              },
            ],
          },
          {
            name: branchB.species.name,
            variations: [],
          },
        ],
      });

      expect(mockGetEvolutionChain).toBeCalledTimes(1);
      expect(mockGetEvolutionChain).toBeCalledWith(mockReq.params.name);
    });

    it('failure', async () => {
      //  predefine mocks
      mockReq.params = {
        name: 'dummyName',
      };
      mockRes.json = jest.fn();

      const expectError = new Error('dummy error');
      mockGetEvolutionChain.mockRejectedValueOnce(expectError);

      //  call
      await sut.getEvolutionChain(mockReq, mockRes, mockNext);

      //  validate
      expect(mockRes.json).toBeCalledTimes(1);
      expect(mockRes.json).toBeCalledWith({});
    });
  });
});
