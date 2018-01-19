import AsosManager from '../../managers/asos.manager';

export const getProduct = ({query: {url}}) => {
  const asosManager = new AsosManager();

  return asosManager.load().then(() => asosManager.getProductDetails(url));
};