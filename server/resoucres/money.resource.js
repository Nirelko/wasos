import BasicResource from './basic.resource';

class MoneyResource extends BasicResource {
  constructor () {
    super('https://api.fixer.io/');
  }

  get () {
    return this.client.get('latest?base=ILS')
      .then(({data: {rates}}) => ({...rates, ILS: 1}));
  }
}

export default MoneyResource;