import {Schema} from 'mongoose';

const sizeSchema = new Schema({
  id: Number,
  name: String
}, {
  _id: false
});

export default new Schema({
  id: {
    type: String,
    required: true
  },
  images: [String],
  name: String,
  url: String,
  sizes: [sizeSchema]
}, {
  _id: false
});