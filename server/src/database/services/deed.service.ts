import { DBService } from '../database.service';

export class DeedDBService extends DBService {
  constructor(db) {
    super(db);
    this.initialize('deed');
  }
}