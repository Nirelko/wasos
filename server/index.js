import AsosManager from './managers/asos-manager';

new AsosManager().getProductDetails('http://m.asos.com/es/adidas-originals/zapatillas-de-deporte-blancas-bb0070-stan-smith-de-adidas-originals/prd/8268038?xaffid=12900&r=1')
  .then(x => {
    debugger;
  })