import {load} from 'dotenv-extended';

import startMongoose from './config/db';
import CurrencyManager from './managers/currency.manager';
import startServer from './config/express';

load();

startMongoose()
  .then(() => CurrencyManager.load())
  .then(() => startServer());
