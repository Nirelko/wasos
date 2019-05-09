import express from 'express';
import {json, urlencoded} from 'body-parser';
import helmet from 'helmet';
import jwt from 'express-jwt';

import api from '../../api';
import WatchWorker from '../../workers/watch.worker';
import FlightWorker from '../../workers/flight.worker';
import urlProductExtractor from './middlewares/url-product-extractor';

export default () => {
  const serverIntance = express();
  const serverPort = process.env.ENV === 'production' ? 80 : 8000;

  serverIntance.use(helmet());
  serverIntance.use(urlencoded({extended: false})); // support encoded bodies
  serverIntance.use(json()); // support json encoded bodies

  serverIntance.use(jwt({ secret: process.env.JWT_SECRET}).unless({path: /^((?!api\/user\/test).)*$/}));

  serverIntance.use('/', express.static('client'))
  serverIntance.use('/api', api);

  serverIntance.use(urlProductExtractor());

  new WatchWorker().start();
  new FlightWorker().start();

  serverIntance.listen(serverPort, () => console.log(`Server listening at port ${serverPort}`));
}