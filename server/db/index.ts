import { MongoClient } from "mongodb";

const dbUri = process.env.MONGODB_URI;
if (!dbUri) throw new Error("MongoDB URI not set");

const dbName = process.env.MONGODB_NAME;
if (!dbName) throw new Error("MongoDB database not set");

const dbCollection = process.env.MONGODB_COLLECTION;
if (!dbCollection) throw new Error("MongoDB collection not set");

const client = new MongoClient(dbUri);

const init = async () => {
  await client.connect();
};

init();

const db = client.db(dbName).collection<{
  long: string;
  code: string;
  lastActive: number | null;
  createdAt: number;
  visited: number;
}>(dbCollection);

export default db;
