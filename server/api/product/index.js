import {AsyncRouter} from 'express-async-router';
import * as controller from './product.controller';

const productRouter = AsyncRouter();

productRouter.get('/', controller.getProduct);

export default productRouter;