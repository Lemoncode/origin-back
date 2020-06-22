import mongoose, { Document, Schema } from 'mongoose';
import { User } from './user.model';

// Mongoose schema types
// https://mongoosejs.com/docs/2.7.x/docs/schematypes.html

const userSecuritySchema = new Schema({
  userName: { type: Schema.Types.String, required: true },
  password: { type: Schema.Types.String, required: true },
  salt: { type: Schema.Types.String, required: true },
  firstname: { type: Schema.Types.String, required: true },
  lastname: { type: Schema.Types.String, required: true },
  role: { type: Schema.Types.String, required: true },
  mustChangePassword: Schema.Types.Boolean,
  isActive: Schema.Types.Boolean,
});

// TODO: Pending to add necessary fields
const userSchema = new Schema({
  userSecurity: { type: userSecuritySchema, required: true },
  email: { type: Schema.Types.String, required: true },
});

export const UserContext = mongoose.model<User & Document>('User', userSchema);
