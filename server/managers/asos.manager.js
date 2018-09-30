import axios from 'axios';
import {head, orderBy, map, flatten} from 'lodash';

import ProductResource from '../resoucres/product.resource';
import storeList from '../constants/store-list.json';
import {findJsonInText, extractPidFromUrl} from '../common/utils';
import CurrencyManager from './currency.manager';

class AsosManager {
  constructor () {
    this.productResource = new ProductResource();
  }

  formatDetailsByStore ({productPrice: {currency, current: {value: price}}, variants}, {relatedCountries, countryCode}) {
    return {
      price,
      currency,
      sizesStock: variants.map(x => x.isInStock),
      countryCode,
      relatedCountries
    };
  }

  findCheapestProduct (productDetailsPrices) {
    return head(orderBy(productDetailsPrices, ({productPrice: {currency, current: {value}}}) => CurrencyManager.convert(value, currency, 'USD')));
  }

  getDetailsByStore (pid, store) {
    return Promise.all(store.currencies.map(currency => this.productResource.getDetailsByStore(pid, {...store, currency})))
      .then((productDetailsPrices) => productDetailsPrices.length && productDetailsPrices[0].length ?
        this.formatDetailsByStore(this.findCheapestProduct(flatten(productDetailsPrices)), store) :
        {relatedCountries: store.relatedCountries, countryCode: store.countryCode, doesntExist: true});
  }

  loadStoresDetails (url) {
    const pid = extractPidFromUrl(url);

    return Promise.all(map(storeList, x => this.getDetailsByStore(pid, x)));
  }

  loadBasicDetails (url) {
    return axios.get(url)
      .then(({data}) => {
        const {name, variants, images} = JSON.parse(findJsonInText(data, data.lastIndexOf('view(\'') + 'view(\''.length));

        return {
          name,
          sizeNames: variants.map(x => x.size),
          images: images.map(x => x.url)
        };
      });
  }

  calculateStoreDetails (sizeNames, stocskAndPrices) {
    return orderBy(stocskAndPrices.map(({price, currency, sizesStock, relatedCountries, countryCode, doesntExist}) => !doesntExist ? {
      price,
      currency,
      relatedCountries,
      countryCode,
      stockSizes: sizeNames.filter((name, index) => sizesStock[index])
    } : {relatedCountries, countryCode, doesntExist}), x => x.price);
  }

  getProductDetails (url) {
    return this.loadBasicDetails(url)
      .then(({name, images, sizeNames}) => this.loadStoresDetails(url)
        .then(stocskAndPrices => ({name, images, storesDetails: this.calculateStoreDetails(sizeNames, stocskAndPrices), url})));
  }
}

export default AsosManager;