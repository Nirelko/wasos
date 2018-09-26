import {AsyncRouter} from 'express-async-router';
import {register, isUsernameAvailable} from './user.controller';

const productRouter = AsyncRouter();

productRouter.post('/', register);
productRouter.get('/username-available/', isUsernameAvailable);

export default productRouter;