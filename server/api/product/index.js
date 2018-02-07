import {AsyncRouter} from 'express-async-router';
import { getProduct } from './product.controller';

const productRouter = AsyncRouter();

productRouter.get('/', getProduct);

export default productRouter;