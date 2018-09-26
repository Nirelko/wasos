import mongoose from 'mongoose';
import 'mongoose-type-email';

export default () => mongoose.connect(process.env.CONNECTION_STRING);