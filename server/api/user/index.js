import {AsyncRouter} from 'express-async-router';
import {register, isUsernameAvailable} from './user.controller';

import watchRouterInjector from './watch';

const productRouter = AsyncRouter();

productRouter.post('/', register);
productRouter.get('/username-available/', isUsernameAvailable);

watchRouterInjector(productRouter);

export default productRouter;