import BasicResource from './basic.resource';

class MoneyResource extends BasicResource {
  constructor () {
    super('https://api.fixer.io/');
  }

  get (baseCurrency = 'USD') {
    return this.client.get(`latest?base=${baseCurrency}`)
      .then(({data: {rates}}) => ({...rates, [baseCurrency]: 1}));
  }
}

export default MoneyResource;