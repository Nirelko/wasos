import AsosManager from './managers/asos-manager';

new AsosManager().getProductDetails('http://www.asos.com/adidas-originals/adidas-originals-stan-smith-trainers-in-white-bb0070/prd/8268038?xaffid=12900&r=1')
  .then(x => {
    debugger;
  })