import {load} from 'dotenv-extended';

import startMongoose from './config/db';
import CurrencyManager from './managers/currency.manager';
import startServer from './config/express';
import CookiesManager from './managers/cookies';

load();

startMongoose()
  .then(() => CurrencyManager.load())
  .then(() => CookiesManager.init())
  .then(() => startServer());
