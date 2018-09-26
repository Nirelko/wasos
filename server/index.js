import {load} from 'dotenv-extended';

import startMongoose from './config/db';
import startServer from './config/express';

load();

startMongoose()
  .then(() => startServer());
