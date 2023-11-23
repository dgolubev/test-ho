import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';

export interface HomeController {
  get: RequestHandler;
}

const HomeControllerFactory = (
): HomeController => {
  /**
   * @route GET /
   */
  const get = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    res.send({
      success: true,
    });
  };

  return {
    get,
  };
};

export default HomeControllerFactory(
);
