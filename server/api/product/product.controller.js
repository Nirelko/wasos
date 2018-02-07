import AsosManager from '../../managers/asos.manager';

export const getProduct = ({query: {url}}) => new AsosManager().getProductDetails(url);