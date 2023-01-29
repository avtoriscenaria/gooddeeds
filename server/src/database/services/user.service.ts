import { DBService } from '../database.service';

export class UserDBService extends DBService {
  constructor(db) {
    super(db);
    console.log('initialize');
    this.initialize('users');
  }
}
