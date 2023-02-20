import { MongoClient } from "mongodb";
import { GET } from "../../../utils/aliases";

async function handleFeaturedEvents(req, res) {
  const client = new MongoClient(process.env.uri, {
    useNewUrlParser: true,
  });

  if (req.method === GET) {
    try {
      await client.connect();
      const database = client.db(process.env.dbName);
      const collection = database.collection("events");
      const events = await collection.find({ isFeatured: true }).toArray();
      res.status(200).json({ message: "Get request was successful", events });
    } catch (error) {
      res.status(500).json({ message: "Get request was failed", error });
    } finally {
      await client.close();
    }
  }
}

export default handleFeaturedEvents;
