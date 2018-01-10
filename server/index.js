import AsosManager from './managers/asos-manager';

new AsosManager().getProductDetails('4601984')
  .then(x => {
    debugger;
  })