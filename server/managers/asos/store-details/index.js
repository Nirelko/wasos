import mongoose, {Schema} from 'mongoose';

import createModelAndSeed from './seeder';

const storeDetailsSchema = new Schema({
  name: String,
  store: String,
  currencies: [String],
  sizeSchema: String,
  countryCode: String,
  relatedCountries: String
});

export default createModelAndSeed('storeDetails', storeDetailsSchema);