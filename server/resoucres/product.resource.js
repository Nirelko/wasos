import BasicResource from './basic.resource';

class ProductResource extends BasicResource {
  constructor () {
    super('http://asos.com/api/');
  }

  getDetailsByStore (id, {store, currency, keyStoreDataversion, countryCode}, cookie) {
    console.log('cookie', cookie);
    return this.client.get('product/catalogue/v3/stockprice', {
      params: {
        productIds: id,
        store,
        currency,
        countryCode,
        keyStoreDataversion
      },
      headers: {
        cookie
      }
    })
      .then(({data}) => data);
  }
}

export default ProductResource;