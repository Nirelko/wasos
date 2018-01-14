import {load} from 'dotenv-extended';

import AsosManager from './managers/asos.manager';
import { exportObjectToFile } from './common/utils';

console.log('Server is loading...');

load();
const asosManager = new AsosManager();

asosManager.load()
  .then(() => {
    console.log('Server finished loading');
  })
  .then(() => asosManager.getProductDetails('http://www.asos.com/nike/nike-air-force-1-mid-07-trainers-in-black-315123-001/prd/4756244?clr=black&SearchQuery=nike%20air%20force%201&gridcolumn=3&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=31'))
  .then(x => {
    console.log(x);
    debugger;
    exportObjectToFile(`${x.name} ${new Date().toDateString()}.txt`, x);
  })
  .catch(x => {
    debugger;
  });