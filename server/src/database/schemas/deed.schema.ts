import * as mongoose from 'mongoose';

export const DeedSchema = new mongoose.Schema({
  name: String,
  text: String,
  user_id: String,
});
