import AsosManager from './managers/asos.manager';

const asosManager = new AsosManager();

asosManager.load()
  .then(() => asosManager.getProductDetails('http://www.asos.com/vans/vans-classic-slip-on-plimsolls-in-black-veyebka/prd/4767693?clr=black&SearchQuery=vans&gridcolumn=4&gridrow=7&gridsize=4&pge=1&pgesize=72&totalstyles=251'))
  .then(x => {
    debugger;
  });