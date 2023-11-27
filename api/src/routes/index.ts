import { Router } from 'express';
import homeController from '@app/controllers/homeController';
import pokemonController from '@app/controllers/pokemonController';

export class Routes {
  static readonly HOME: string = '/';
  static readonly POKEMON_EVOLUTION_CHAIN: string = '/pokemon/:name/evolution-chain';
}

const routes = () => {
  const router = Router();

  router
    .route(Routes.HOME)
    .get(
      homeController.get,
    );

  router
    .route(Routes.POKEMON_EVOLUTION_CHAIN)
    .get(
      pokemonController.getEvolutionChain,
    );

  return router;
};

export default routes;
