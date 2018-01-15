import {AsyncRouter} from 'express-async-router';
import * as controller from './product.controller';

const productRouter = AsyncRouter();

productRouter.post('/', controller.getProduct);

export default productRouter;