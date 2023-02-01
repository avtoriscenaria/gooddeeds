import { Document } from 'mongoose';

export interface User extends Document {
  nickname: string;
  email: string;
  password: string;
  friends: string[];
  uuid_key: string;
}
