import axios from 'axios';
import _ from 'lodash';

import ProductResource from '../resoucres/product.resource';
import MoneyResource from '../resoucres/money.resource';
import storeList from '../constants/store-list.json';
import { findJsonInText } from '../common/utils';

class AsosManager {
  constructor () {
    this.productResource = new ProductResource();
    this.moneyResource = new MoneyResource();
  }

  load () {
    return this.moneyResource.load();
  }

  formatDetailsByStore ({productPrice: {currency, current: {value: price}}, variants}, relatedCountries) {
    return {
      price: this.moneyResource.convert(price, currency),
      sizesStock: variants.map(x => x.isInStock),
      relatedCountries
    };
  }

  extractPidFromUrl (url) {
    const pidStartIndex = url.indexOf('prd/') + 'prd/'.length;
    let pidEndIndex = url.indexOf('?', pidStartIndex);

    if (pidEndIndex === -1) {
      pidEndIndex = url.length;
    }

    return url.substring(pidStartIndex, pidEndIndex);
  }

  getDetailsByStore (pid, store) {
    return this.productResource.getDetailsByStore(pid, store)
      .then(([product]) => product ?
        this.formatDetailsByStore(product, store.relatedCountries) :
        {relatedCountries: store.relatedCountries, doesntExist: true});
  }

  loadStoresDetails (url) {
    const pid = this.extractPidFromUrl(url);

    return Promise.all(_.map(storeList, x => this.getDetailsByStore(pid, x)));
  }

  loadBasicDetails (url) {
    return axios.get(url)
      .then(({data}) => {
        const {name, variants} = JSON.parse(findJsonInText(data, data.lastIndexOf('view(\'') + 'view(\''.length));

        return {
          name,
          sizeNames: variants.map(x => x.size)
        };
      });
  }

  calculateAvailableSizes (sizeNames, stocskAndPrices) {
    return _.orderBy(stocskAndPrices.map(({price, sizesStock, relatedCountries, doesntExist}) => !doesntExist ? {
      price,
      relatedCountries,
      stockSizes: sizeNames.filter((name, index) => sizesStock[index])
    } : {relatedCountries, doesntExist}), x => x.price);
  }

  getProductDetails (url) {
    return this.loadBasicDetails(url)
      .then(({name, sizeNames}) => this.loadStoresDetails(url)
        .then(stocskAndPrices => ({name, sizes: this.calculateAvailableSizes(sizeNames, stocskAndPrices)})));
  }
}

export default AsosManager;