import BasicResource from './basic.resource';

class MoneyResource extends BasicResource {
  constructor () {
    super('https://api.fixer.io/');
  }

  load () {
    return this.client.get('latest?base=ILS')
      .then(({data: {rates}}) => {
        this.rates = rates;
      });
  }

  convert (amount, from) {
    if (!this.rates) {
      throw new Error('rates haven\'t load yet');
    }

    return Math.round(amount / this.rates[from]);
  }
}

export default MoneyResource;