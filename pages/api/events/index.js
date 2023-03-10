import { MongoClient } from "mongodb";
import { GET } from "../../../utils/aliases";

async function handleEvents(req, res) {
  if (req.method !== GET)
    return res.status(405).json({ message: "Method is not allowed" });
  const client = new MongoClient(process.env.uri, {
    useNewUrlParser: true,
  });
  try {
    await client.connect();
    const database = client.db(process.env.dbName);
    const collection = database.collection("events");
    const events = await collection.find({}).toArray();
    res.status(200).json({ message: "Get request was successful", events });
  } catch (error) {
    res.status(500).json({ message: "Get request was failed", error });
  } finally {
    await client.close();
  }
}

export default handleEvents;
