import { Router } from 'express';

import product from './product';

const apiRouter = Router();

apiRouter.use('/product', product);

export default apiRouter;