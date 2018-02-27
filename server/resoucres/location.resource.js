import BasicResource from './basic.resource';

class LocationResource extends BasicResource {
  constructor () {
    super('http://freegeoip.net/json/');
  }

  getByIp (ip) {
    return this.client.get(
      `/${ip}`)
      .then(({data}) => data);
  }
}

export default LocationResource;