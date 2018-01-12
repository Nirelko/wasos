import { create } from 'axios';

class BasicResource {
  constructor (baseURL) {
    this.client = create({
      baseURL
    });
  }
}

export default BasicResource;