import * as mongodb from 'mongodb';
import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_CONNECTION } from 'src/constants';

@Injectable()
export class DBService {
  constructor(@Inject(DATABASE_CONNECTION) private db: mongodb.Db) {}

  protected initialize = (dbName) => {
    console.log('dbName', dbName);
    this.database = this.db.collection(dbName);
  };

  database;

  get = async (data) => {
    return await this.database.findOne(data);
  };

  getById = async (id) => {
    return await this.database.findOne({ _id: id });
  };

  getAll = async () => {
    return await this.database.find({}).toArray();
  };

  create = async (data) => {
    console.log('database');
    return await this.database.insertOne(data);
  };

  update = async (uniqParam, newData) => {
    return await this.database.findOneAndUpdate();
  };
}
