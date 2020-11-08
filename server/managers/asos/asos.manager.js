import axios from 'axios';
import {flatten, head, map, min, sortBy, orderBy} from 'lodash';
import {findJsonInText} from '@nirelko/wasos-common';
import currencyToCountryCodeMap from 'currency-code-map';

import ProductResource from '../../resoucres/product.resource';
import CurrencyManager from '../currency.manager';
import CookieManager from '../cookies';
import StoreDetails from './store-details';

class AsosManager {
  constructor () {
    this.productResource = new ProductResource();
    this.countryCodeToSizeScheme = {
      us: {
        countryCode: 'us',
        browseCountry: 'US',
        browseCurrency: 'USD'
      },
      uk: {
        countryCode: 'uk',
        browseCountry: 'GB',
        browseCurrency: 'GBP'
      },
      eu: {
        countryCode: 'il',
        browseCountry: 'IL',
        browseCurrency: 'ILS'
      }
    };
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

  formatDetailsByAvailability (productDetailsPrices, store) {
    return productDetailsPrices.length && productDetailsPrices[0].length ?
      this.formatDetailsByStore(this.findCheapestProduct(flatten(productDetailsPrices)), store) :
      {relatedCountries: store.relatedCountries, countryCode: store.countryCode, doesntExist: true};
  }

  getDetailsByCurrencies (pid, store, keyStoreDataversion, cookie) {
    return Promise.all(store.currencies.map(currency => this.productResource.getDetailsByStore(pid, {
      ...store,
      keyStoreDataversion,
      currency
    }, cookie)));
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

  calculateStoreDetails (stocskAndPrices) {
    return sortBy(stocskAndPrices.map(({price, currency, sizesStock, relatedCountries, countryCode, doesntExist}) => !doesntExist ? {
      price,
      currency,
      relatedCountries,
      countryCode,
      sizesStock
    } : {relatedCountries, countryCode, doesntExist}), [x => x.price]);
  }

  generateUrlByCountryCode ({countryCode, ...urlParams}, oldUrl) {
    const urlParts = oldUrl.split('/');
    const urlCountryCode = urlParts[3];

    if (Object.keys(currencyToCountryCodeMap).includes(urlCountryCode.toUpperCase())) {
      if (countryCode === 'uk') {
        urlParts.splice(3, 1);
      }
      else {
        urlParts[3] = countryCode;
      }
    }
    else if (countryCode !== 'uk') {
      urlParts.splice(3, 0, countryCode);
    }

    return this.buildCountryUrlWithParams(urlParts, urlParams);
  }

  buildCountryUrlWithParams (urlParts, urlParams) {
    let resultUrl = urlParts.join('/');

    resultUrl = `${resultUrl}${resultUrl.indexOf('?') === -1 ? '?' : '&'}`;

    return `${resultUrl}${map(urlParams, (value, key) => `${key}=${value}`).join('&')}`;
  }

  loadAllSizeSchemes (basicProductDetails, url, cookie) {
    const productSize = head(basicProductDetails.sizes);

    if (!Object.keys(this.countryCodeToSizeScheme).some(x => productSize.toLowerCase().includes(x))) {
      return {
        ...basicProductDetails,
        sizeSchemeToSizesNames: this.createUniversalScheme(basicProductDetails.sizes)
      };
    }

    return Promise.all(Object.keys(this.countryCodeToSizeScheme)
      .map(countryCode => (productSize.toLowerCase().includes(countryCode) ?
        Promise.resolve({[countryCode]: basicProductDetails.sizes}) :
        this.loadProductBasicDetails(this.generateUrlByCountryCode(this.countryCodeToSizeScheme[countryCode], url), cookie)
          .then(({sizes} = {}) => !sizes ? {} : ({[countryCode]: sizes})))))
      .then(sizeSchemesToSizesNames => {
        return ({
          ...basicProductDetails,
          sizeSchemeToSizesNames: Object.assign(...sizeSchemesToSizesNames)
        });
      });
  }

  createUniversalScheme (sizes) {
    const resultSchemeDictionary = {universal: true};

    Object.keys(this.countryCodeToSizeScheme)
      .forEach(x => {
        resultSchemeDictionary[x] = sizes;
      });

    return resultSchemeDictionary;
  }

  findKeyStoreDataversion (text) {
    const valueStartIndex = text.indexOf('keyStoreDataversion=') + 'keyStoreDataversion='.length;
    const semicolonEndIndex = text.indexOf(';', valueStartIndex);
    const commaEndIndex = text.indexOf('"', valueStartIndex);

    return text.substring(valueStartIndex, min([semicolonEndIndex, commaEndIndex]));
  }

  loadProductBasicDetails (url, cookie) {
    console.log('cookies', cookie);
    return axios.get(url, {
      headers: {
        cookie
      }
    })
      .then(({data}) => {
        if (!data) {
          return;
        }

        const startIndexOfDetails = data.lastIndexOf('window.asos.pdp.config.product =');

        if (startIndexOfDetails === -1) {
          return;
        }

        let productDetails = JSON.parse(findJsonInText(data, startIndexOfDetails + 'window.asos.pdp.config.product ='.length));
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
          sizes: variants.map(({size: name}) => name),
          images: images.map(x => x.url),
          keyStoreDataversion
        };
      });
  }

  getProductDetails (url) {
    return CookieManager.getCookie(url)
      .then(cookie => this.loadProductBasicDetails(url, cookie)
        .then(basicProductDetails => this.loadAllSizeSchemes(basicProductDetails, url, cookie))
        .then(({id, name, images, sizeGuide, keyStoreDataversion, sizeSchemeToSizesNames}) => this.loadStoresDetails(id, keyStoreDataversion, cookie)
          .then(stocksAndPrices => ({
            id: id.toString(),
            name,
            images,
            sizeGuide,
            storesDetails: this.calculateStoreDetails(stocksAndPrices),
            sizeSchemeToSizesNames,
            url
          })
          )));
  }
}

export default AsosManager;