import BasicResource from './basic.resource';

class LocationResource extends BasicResource {
  constructor () {
    super('https://extreme-ip-lookup.com/json/');
  }

  getByIp (ip) {
  // eslint-disable-next-line camelcase
    return this.client.get(`/${ip}`)
      .then(({data}) => data);
  }
}

export default LocationResource;