import { Router } from 'express';
import homeController from '../controllers/homeController';

export class Routes {
  static readonly HOME: string = '/home';
}

const routes = () => {
  const router = Router();

  router
    .route(Routes.HOME)
    .get(
      homeController.get,
    );

  return router;
};

export default routes;
