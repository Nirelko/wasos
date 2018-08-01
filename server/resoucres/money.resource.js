import BasicResource from './basic.resource';

class MoneyResource extends BasicResource {
  constructor () {
    super(`http://data.fixer.io/api/latest?access_key=${process.env.CURRENCY_API_KEY}&format=1`);
  }

  get (baseCurrency = 'USD') {
    return this.client.get(`latest?base=${baseCurrency}`)
      .then(({data: {rates}}) => ({...rates, [baseCurrency]: 1}));
  }
}

export default MoneyResource;