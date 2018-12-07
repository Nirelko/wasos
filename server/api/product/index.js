import {AsyncRouter} from 'express-async-router';

import {getProduct, getExampleProduct} from './product.controller';

const productRouter = AsyncRouter();

productRouter.get('/', getProduct);
productRouter.get('/example', getExampleProduct);

export default productRouter;