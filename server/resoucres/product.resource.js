import BasicResource from './basic.resource';

class ProductResource extends BasicResource {
  constructor () {
    super('http://asos.com/api/');
  }

  getDetailsByStore (id, {store, currency, keyStoreDataversion, countryCode}, cookie) {
    console.log('cookie', cookie);
    console.log('before getDetailsByStore');
    return this.client.get('product/catalogue/v3/stockprice', {
      params: {
        productIds: id,
        store,
        currency,
        countryCode,
        keyStoreDataversion
      }
      // headers: {
      //   cookie
      // }
    })
      .then(({data}) => {
        console.log('after getDetailsByStore');
        return data;
      });
  }
}

export default ProductResource;