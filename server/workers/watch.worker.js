import getSymbolFromCurrency from 'currency-symbol-map';
import countiesMapping from 'i18n-iso-countries';
import randomNumber from 'random-number-csprng';
import moment, {duration} from 'moment';
import {chain, map, flatten, value, orderBy, reduce} from 'lodash';

import CurrencyManager from '../managers/currency.manager';
import {convert} from '../../common/utils';
import AsosManager from '../managers/asos/asos.manager';
import GmailManager from '../managers/gmail.manager';
import User from '../api/user/user.model';

class WatchWorker {
  constructor () {
    this.gmailManager = new GmailManager();
    this.asosManager = new AsosManager();
    this.checkWatches = this.checkWatches.bind(this);
  }

  getWatchesGroupedByProduct () {
    return User.find({}).select({email: 1, watches: 1})
      .then(users => chain(users).map(x => x.toObject())
        .map(({email, watches}) => watches.map(watch => ({...watch, email})))
        .flatten()
        .groupBy(x => x.product.id)
        .value());
  }

  getFulfilledWatchesMailData (productWatches, storesDetails, currencies) {
    return reduce(productWatches, (fulfilledWatchesMailData, watch) => {
      const watchConvertedPrice = convert(watch.price, currencies[watch.currency], currencies.USD);

      const storeDetails = storesDetails.find(x => x.convertedPrice < watchConvertedPrice && x.stockSizesIds.find(sizeId => sizeId === watch.sizeId));

      return storeDetails ? [
        ...fulfilledWatchesMailData, {
          storeDetails,
          watch
        }
      ] : fulfilledWatchesMailData;
    }, []);
  }

  removeWatch({watch: {email, product: {id: productId}}}) {
    return User.findOne({email})
      .then(x => {
        x.watches = x.watches.filter(x => x.product.id !== productId);

        return x.save();
      });
  }

  sendMail ({watch: {email: to, currency: targetCurrency, sizeId, product: {name, sizes, url}}, storeDetails: {convertedPrice: price, currency, countryCode}}) {
    return this.gmailManager.send({
      to,
      subject: `Hey, ${name} is available at your desired price and size`,
      text: `Hey, ${name} is available at the price of ${price}${getSymbolFromCurrency(targetCurrency)} and the size ${sizes.find(x => x.id === sizeId).name}!\n
             Go to asos and switch to the country ${countiesMapping.getName(countryCode, 'en')} and use the currency ${currency}.   
             Go check it right now on Asos!: \n
             ${url}`
    });
  }

  handleFulfilledWatch(fulfilledWatchMailData) {
    this.sendMail(fulfilledWatchMailData);

    return this.removeWatch(fulfilledWatchMailData);
  }

  sampleProductWatches (productWatches, currencies) {
    return this.asosManager.getProductDetails(productWatches[0].product.url)
      .then(productStoreDetails => {
        const storesDetails = orderBy(productStoreDetails.storesDetails.map(stocksAndPrice => ({
          ...stocksAndPrice,
          stockSizesIds: stocksAndPrice.stockSizes.map(x => productStoreDetails.sizes.find(y => y.name === x).id),
          convertedPrice: convert(stocksAndPrice.price, currencies[stocksAndPrice.currency], currencies.USD)
        })), x => x.convertedPrice);

        const fulfilledWatchesMailData = this.getFulfilledWatchesMailData(productWatches, storesDetails, currencies);

        return Promise.all(fulfilledWatchesMailData.map(x => this.handleFulfilledWatch(x)));
      });
  }

  setTimeoutForWatchesSample (productWatches, minimumTimeout, maxTimeout, currencies) {
    return randomNumber(minimumTimeout, maxTimeout)
      .then(timeout => new Promise((resolve, reject) => {
        setTimeout(() => {
          return this.sampleProductWatches(productWatches, currencies)
            .then(result => resolve(result))
            .catch(error => reject(error));
        }, timeout);
      }));
  }

  checkWatches () {
    console.log(`Sampling watches (${moment().format('DD/MM/YY HH:MM')})`);

    return CurrencyManager.get()
      .then(currencies => this.getWatchesGroupedByProduct()
        .then(watchesGroupedByProduct => {
          const minimumTimeout = duration(1, 'h').asMilliseconds();
          const maxTimeout = duration(process.env.WATCH_CHECK_RATE_HOURS - 1, 'h').asMilliseconds();

          return Promise.all(map(watchesGroupedByProduct, productWatches => this.setTimeoutForWatchesSample(productWatches, minimumTimeout, maxTimeout, currencies)));
        }));
  }

  start () {
    if (this.mainIntervalId) {
      throw new Error(`The worker with the interval id: ${this.mainIntervalId} has already been started`);
    }

    this.mainIntervalId = setInterval(this.checkWatches, duration(Number.parseInt(process.env.WATCH_CHECK_RATE_HOURS, 10), 'h').asMilliseconds());
  }
}

export default WatchWorker;