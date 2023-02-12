import { MongoClient } from "mongodb";
import { GET, POST } from "../../../utils/aliases";

async function handleComments(req, res) {
  const client = new MongoClient(process.env.uri, {
    useNewUrlParser: true,
  });

  if (req.method === GET) {
    try {
      const database = client.db(process.env.dbName);
      const collection = database.collection("comments");
      const comments = await collection
        .find({ eventId: req.query.eventId })
        .toArray();
      res
        .status(200)
        .json({ message: "Get request was successful,", comments });
    } catch (error) {
      res.status(500).json({ message: "Get request was failure", error });
    } finally {
      await client.close();
    }
  }
  if (req.method === POST) {
    try {
      const database = client.db(process.env.dbName);
      const collection = database.collection("comments");
      const response = await collection.insertOne(req.body);
      res
        .status(201)
        .json({ message: "Post request was successful,", response });
    } catch (error) {
      res.status(503).json({ message: "Post request was failure", error });
    } finally {
      await client.close();
    }
  }
}

export default handleComments;
