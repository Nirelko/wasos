import { Router } from 'express';

import product from './product';
import currency from './currency';

const apiRouter = Router();

apiRouter.use('/product', product);
apiRouter.use('/currency', currency);

export default apiRouter;