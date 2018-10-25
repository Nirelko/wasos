import BasicResource from './basic.resource';

class ProductResource extends BasicResource {
  constructor () {
    super('http://asos.com/api/');
  }

  getDetailsByStore (id, {store, currency, countryCode}) {
    return this.client.get('product/catalogue/v2/stockprice', {
      params: {
        productIds: id,
        store,
        currency,
        countryCode
      }
    })
      .then(({data}) => data);
  }
}

export default ProductResource;