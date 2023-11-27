import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import pokemonApiService, { PokemonApiService } from '../services/pokemonApi';
import { PokemonEvolutionChainBranch } from '@app/models/Pokemon';

export interface PokemonController {
  getEvolutionChain: RequestHandler;
}

export const PokemonControllerFactory = (
  pokemonApi: PokemonApiService,
): PokemonController => {

  /**
   * Get Evolution chain by name
   * @route GET pokemon/:name/evolution-chain
   */
  const getEvolutionChain = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    const name = req.params['name'];

    try {
      const mainBranch = (await pokemonApi.getEvolutionChain(name)).chain;

      const formatChain = (branch: PokemonEvolutionChainBranch): {} => {
        const variations = branch.evolves_to
          .map(variation => formatChain(variation));

        return {
          name: branch.species.name,
          variations: variations,
        }
      }

      res.json(formatChain(mainBranch));
    }catch (e) {
      res.json({});
    }
  };

  return {
    getEvolutionChain,
  };
};

export default PokemonControllerFactory(
  pokemonApiService,
);
