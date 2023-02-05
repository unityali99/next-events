import { MongoClient, ServerApiVersion } from "mongodb";
import { GET } from "../../../utils/aliases";
import { dbName, uri } from "../../../utils/api";

async function handleEvents(req, res) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  });

  if (req.method === GET) {
    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection("events");
      const events = await collection.find({}).toArray();
      res.status(200).json({ message: "Get request was successful", events });
    } catch (error) {
      res.status(500).json({ message: "Get request was failed", error });
    } finally {
      await client.close();
    }
  }
}

export default handleEvents;
