import axios from 'axios';

class AsosManager {
  constructor() {
    this.client = axios.create({
      baseURL: 'http://m.asos.com/api/'
    });
  }

  getProductDetails(pid, { store: store = 'COM', currency: currency = 'USD' } = { store: 'COM', currency: 'USD' }) {
    return this.client.get(`/product/catalogue/v2/stockprice?productIds=${pid}&store=${store}&currency=${currency}&keyStoreDataversion=2&sizeSchema=US&country=USD`)
      .then(x => x.data);
  }
}

export default AsosManager;