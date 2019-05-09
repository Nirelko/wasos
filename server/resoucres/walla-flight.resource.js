import BasicResource from './basic.resource';

class ProductResource extends BasicResource {
  constructor () {
    super('https://m.wallatours.co.il');
  }

  getFlightsDetails () {
    return this.client.post('GetDomesticResults', {
      routes: [
        {
          originAirport: 'ETM',
          destinationAirport: 'TLV,SDV',
          departureDate: '01-06-2019'
        }
      ],
      passengers: {
        adults: '1'
      }
    })
      .then(({data}) => data);
  }
}

export default ProductResource;