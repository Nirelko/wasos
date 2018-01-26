import BasicResource from './basic.resource';

class ProductResource extends BasicResource {
  constructor () {
    super('http://m.asos.com/api/');
  }

  getDetailsByStore (id, {store, currency, sizeSchema, countryCode}) {
    return this.client.get(
      `/product/catalogue/v2/stockprice?productIds=${id}&store=${store}&currency=${currency}&keyStoreDataversion=2&sizeSchema=${sizeSchema}&country=${countryCode}`)
      .then(({data}) => data);
  }
}

export default ProductResource;