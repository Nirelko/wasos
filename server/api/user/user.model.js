import mongoose, {Schema, SchemaTypes} from 'mongoose';
import bcryptPlugin from 'mongoose-bcrypt';

import WatchSchema from './watch/watch.schema';

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  email: {
    type: SchemaTypes.Email,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false,
    bcrypt: true
  },
  watches: {
    type: [WatchSchema],
    default: []
  }
});

userSchema.plugin(bcryptPlugin);

export default mongoose.model('users', userSchema);