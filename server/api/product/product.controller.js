import AsosManager from '../../managers/asos/asos.manager';
import exampleProduct from './exampleProduct.json';

export const getProduct = ({query: {url}}) => new AsosManager().getProductDetails(url);

export const getExampleProduct = () => exampleProduct;