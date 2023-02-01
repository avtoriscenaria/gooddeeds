import { Document } from 'mongoose';

export interface Deed extends Document {
  text: string;
  name: string;
  user_id: string;
}
