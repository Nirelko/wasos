import {Schema} from 'mongoose';

import ProductSchema from '../../product/product.schema';

export default new Schema({
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
  },
  product: ProductSchema
});