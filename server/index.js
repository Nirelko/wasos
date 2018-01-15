import express from 'express';
import { load } from 'dotenv-extended';
import { json, urlencoded } from 'body-parser';

import api from './api';

console.log('Server is loading...');

load();

console.log('Server finished loading');
const serverIntance = express();
const serverPort = process.env.ENV === 'production' ? 80 : 8000;

serverIntance.use(urlencoded({ extended: false })); // support encoded bodies
serverIntance.use(json()); // support json encoded bodies

serverIntance.use('/api', api);

serverIntance.listen(serverPort, () => console.log(`Server listening at port ${serverPort}`));