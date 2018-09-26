import BasicResource from './basic.resource';

class LocationResource extends BasicResource {
  constructor () {
    super('http://api.ipstack.com/');
  }

  getByIp (ip) {
  // eslint-disable-next-line camelcase
    return this.client.get(`/${ip}`, {params: {access_key: process.env.LOCATION_API_KEY}})
      .then(({data}) => data);
  }
}

export default LocationResource;