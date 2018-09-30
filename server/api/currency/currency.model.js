import mongoose, {Schema} from 'mongoose';

const currencySchema = new Schema({
  currencies: {
    type: Object,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('currency', currencySchema);