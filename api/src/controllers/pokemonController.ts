import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import pokemonApiService, { PokemonApiService } from '../services/pokemonApi';

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

    const response = pokemonApi.getEvolutionChain(name);

    res.send(response);
  };

  return {
    getEvolutionChain,
  };
};

export default PokemonControllerFactory(
  pokemonApiService,
);
