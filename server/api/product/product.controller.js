import AsosManager from '../../managers/asos.manager';

export const getProduct = ({body: {url}}) => {
  const asosManager = new AsosManager();

  return asosManager.load().then(() => asosManager.getProductDetails(url));
};