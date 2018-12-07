import {Schema} from 'mongoose';

export default new Schema({
  product: {
    id: {
      type: String,
      required: true
    },
    images: [String],
    name: String,
    url: String,
    sizes: {
      id: Number,
      name: String
    }
  },
  sizeId: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  }
});