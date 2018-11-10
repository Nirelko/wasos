import BasicResource from './basic.resource';

class ProductResource extends BasicResource {
  constructor () {
    super('http://asos.com/api/');
  }

  getDetailsByStore (id, {store, currency, keyStoreDataversion, countryCode}) {
    return this.client.get('product/catalogue/v2/stockprice', {
      params: {
        productIds: id,
        store,
        currency,
        countryCode,
        keyStoreDataversion
      }
    })
      .then(({data}) => data);
  }
}

export default ProductResource;