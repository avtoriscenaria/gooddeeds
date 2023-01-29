import { MongoClient, Db, ServerApiVersion } from 'mongodb';
import { DATABASE_CONNECTION } from 'src/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<Db> => {
      try {
        const client = new MongoClient(process.env.MONGO_URI, {
          //@ts-ignore
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverApi: ServerApiVersion.v1,
        });
        const db = client.db(process.env.DB_NAME);

        return db;
      } catch (error) {
        throw error;
      }
    },
  },
];
