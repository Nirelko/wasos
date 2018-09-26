import {Router} from 'express';

import product from './product';
import currency from './currency';
import user from './user';
import auth from './auth';

const apiRouter = Router();

apiRouter.use('/product', product);
apiRouter.use('/currency', currency);
apiRouter.use('/user', user);
apiRouter.use('/auth', auth);

export default apiRouter;