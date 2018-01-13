import {load} from 'dotenv-extended';

import AsosManager from './managers/asos.manager';

console.log('Server is loading...');

load();
const asosManager = new AsosManager();

asosManager.load()
  .then(() => {
    console.log('Server finished loading');
  })
  .then(() => asosManager.getProductDetails('http://www.asos.com/nike/nike-air-force-1-07-lv8-trainers-in-black-823511-007/prd/8176751?clr=black&SearchQuery=nike%20air%20force%201&gridcolumn=1&gridrow=7&gridsize=4&pge=1&pgesize=72&totalstyles=27'))
  .then(x => {
    console.log(x);
    debugger;
  })
  .catch(x => {
    debugger;
  });