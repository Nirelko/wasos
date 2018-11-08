import _ from 'lodash';
import {load} from 'dotenv-extended';

import startMongo from '../server/config/db';
import '../server/api';
import '../server/managers/asos/store-details';
import seeds from '../server/config/db/seed';

load();

startMongo()
  .then(() => _.reduce(seeds, (oldSeederPromise, {run, collectionName}) => {
    console.log(`Now seeding ${collectionName}`);

    return oldSeederPromise
      .then(() => run())
      .then(() => console.log(`Finished seeding ${collectionName}`))
      .catch(err => console.log(`Failed seeding ${collectionName}, error: ${err}`));
  }, Promise.resolve()))
  .then(() => process.exit(0));