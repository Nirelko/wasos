import axios from 'axios';

class AsosManager {
  constructor () {
    this.client = axios.create({
      baseURL: 'http://m.asos.com/api/'
    });

    this.extractPidFromUrl = this.extractPidFromUrl.bind(this);
    this.getProductDetails = this.getProductDetails.bind(this);
  }

  extractPidFromUrl (url) {
    const pidStartIndex = url.indexOf('prd/') + 4;

    return url.substring(pidStartIndex, url.indexOf('?', pidStartIndex));
  }

  getProductDetails(url, { store, currency, sizeSchema, country}) {
    return this.client.get(`/product/catalogue/v2/stockprice?productIds=${this.extractPidFromUrl(url)}&store=${store}&currency=${currency}&keyStoreDataversion=2&sizeSchema=${sizeSchema}&country=${country}`)
      .then(x => x.data);
  }
}

export default AsosManager;