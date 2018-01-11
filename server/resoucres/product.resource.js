import BasicResource from './basic.resource';

class ProductResource extends BasicResource {
  constructor () {
    super('http://m.asos.com/api/');
  }

  getDetailsByStore (id, {store, currency, sizeSchema, country}) {
    return this.client.get(
      `/product/catalogue/v2/stockprice?productIds=${id}&store=${store}&currency=${currency}&keyStoreDataversion=2&sizeSchema=${sizeSchema}&country=${country}`)
      .then(({data}) => data);
  }
}

export default ProductResource;