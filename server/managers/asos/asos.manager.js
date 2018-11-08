import axios from 'axios';
import {head, orderBy, map, flatten, chain, value} from 'lodash';

import ProductResource from '../../resoucres/product.resource';
import {findJsonInText, extractPidFromUrl} from '../../common/utils';
import CurrencyManager from '../currency.manager';
import StoreDetails from './store-details';

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
    return chain(productDetailsPrices)
      .orderBy(({productPrice: {currency, current: {value}}}) => CurrencyManager.convert(value, currency, 'USD'))
      .head()
      .value();
  }

  formatDetailsByAvailability (productDetailsPrices, store) {
    return productDetailsPrices.length && productDetailsPrices[0].length ?
      this.formatDetailsByStore(this.findCheapestProduct(flatten(productDetailsPrices)), store) :
      {relatedCountries: store.relatedCountries, countryCode: store.countryCode, doesntExist: true};
  }

  getDetailsByCurrencies (store, pid) {
    return Promise.all(store.currencies.map(currency => this.productResource.getDetailsByStore(pid, {...store, currency})));
  }

  getDetailsByStore (pid, store) {
    return this.getDetailsByCurrencies(store, pid)
      .then(productDetailsPrices => this.formatDetailsByAvailability(productDetailsPrices, store));
  }

  getAllStores () {
    return StoreDetails.find()
      .then(x => x.map(y => y.toObject()));
  }

  loadStoresDetails (id) {
    return this.getAllStores()
      .then(stores => Promise.all(stores.map(x => this.getDetailsByStore(id, x))));
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

  loadProductBasicDetails (url) {
    return axios.get(url)
      .then(({data}) => {
        let productDetails = JSON.parse(findJsonInText(data, data.lastIndexOf('view(\'') + 'view(\''.length));

        if (productDetails.products) {
          [productDetails] = productDetails.products; // TODO: Add feature of choosing which product to show on multiple products option
          productDetails.images = [productDetails.productImage];
        }

        const {id, name, variants, images} = productDetails;

        return {
          id,
          name,
          sizeNames: variants.map(x => x.size),
          images: images.map(x => x.url)
        };
      });
  }

  getProductDetails (url) {
    return this.loadProductBasicDetails(url)
      .then(({id, name, images, sizeNames}) => this.loadStoresDetails(id)
        .then(stocksAndPrices => ({
          name,
          images,
          storesDetails: this.calculateStoreDetails(sizeNames, stocksAndPrices),
          url
        })
        ));
  }
}

export default AsosManager;