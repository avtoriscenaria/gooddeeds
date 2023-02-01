import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  nickname: String,
  email: String,
  password: String,
  friends: Array,
  uuid_key: String,
});
