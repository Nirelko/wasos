import mongoose, {Schema, SchemaTypes} from 'mongoose';
import bcryptPlugin from 'mongoose-bcrypt';

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
  }
});

userSchema.plugin(bcryptPlugin);

export default mongoose.model('users', userSchema);