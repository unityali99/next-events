import { MongoClient, ServerApiVersion } from "mongodb";
import { GET } from "../../../utils/aliases";
import { dbName, uri } from "../../../utils/api";

async function handleComments(req, res) {
  const client = new MongoClient(uri, { useNewUrlParser: true });

  if (req.method === GET) {
    try {
      const database = client.db(dbName);
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
}

export default handleComments;
