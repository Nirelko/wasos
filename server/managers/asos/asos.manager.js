import axios from 'axios';
import {head, orderBy, map, flatten, chain, value, min} from 'lodash';
import {findJsonInText} from '@nirelko/wasos-common';

import ProductResource from '../../resoucres/product.resource';
import CurrencyManager from '../currency.manager';
import CookieManager from '../cookies';
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

  getDetailsByCurrencies (pid, store, keyStoreDataversion, cookie) {
    return Promise.all(store.currencies.map(currency => this.productResource.getDetailsByStore(pid, {...store, keyStoreDataversion, currency}, cookie)));
  }

  getDetailsByStore (pid, store, keyStoreDataversion, cookie) {
    return this.getDetailsByCurrencies(pid, store, keyStoreDataversion, cookie)
      .then(productDetailsPrices => this.formatDetailsByAvailability(productDetailsPrices, store));
  }

  getAllStores () {
    return StoreDetails.find()
      .then(x => x.map(y => y.toObject()));
  }

  loadStoresDetails (id, keyStoreDataversion, cookie) {
    return this.getAllStores()
      .then(stores => Promise.all(stores.map(x => this.getDetailsByStore(id, x, keyStoreDataversion, cookie))));
  }

  calculateStoreDetails (sizes, stocskAndPrices) {
    return orderBy(stocskAndPrices.map(({price, currency, sizesStock, relatedCountries, countryCode, doesntExist}) => !doesntExist ? {
      price,
      currency,
      relatedCountries,
      countryCode,
      stockSizes: sizes.filter((size, index) => sizesStock[index]).map(x => x.name)
    } : {relatedCountries, countryCode, doesntExist}), x => x.price);
  }

  findKeyStoreDataversion (text) {
    const valueStartIndex = text.indexOf('keyStoreDataversion=') + 'keyStoreDataversion='.length;
    const semicolonEndIndex = text.indexOf(';', valueStartIndex);
    const commaEndIndex = text.indexOf('"', valueStartIndex);

    return text.substring(valueStartIndex, min([semicolonEndIndex, commaEndIndex]));
  }

  loadProductBasicDetails (url, cookie) {
    return axios.get(url, {
      headers: {
        cookie
      }
    })
      .then(({data}) => {
        let productDetails = JSON.parse(findJsonInText(data, data.lastIndexOf('view(') + 'view('.length));
        const keyStoreDataversion = this.findKeyStoreDataversion(data);

        if (productDetails.products) {
          [productDetails] = productDetails.products; // TODO: Add feature of choosing which product to show on multiple products option
          productDetails.images = [productDetails.productImage];
        }

        const {id, name, variants, images, sizeGuide} = productDetails;

        return {
          id,
          name,
          sizeGuide,
          sizes: variants.map(({size: name, variantId: id}) => ({id, name})),
          images: images.map(x => x.url),
          keyStoreDataversion
        };
      });
  }

  getProductDetails (url) {
    return CookieManager.getCookie(url)
      .then(cookie => this.loadProductBasicDetails(url, cookie)
        .then(({id, name, images, sizeGuide, sizes, keyStoreDataversion}) => this.loadStoresDetails(id, keyStoreDataversion, cookie)
          .then(stocksAndPrices => ({
            id: id.toString(),
            name,
            images,
            sizeGuide,
            storesDetails: this.calculateStoreDetails(sizes, stocksAndPrices),
            sizes,
            url
          })
          )));
  }
}

export default AsosManager;