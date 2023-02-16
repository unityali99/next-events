import { MongoClient } from "mongodb";
import { generate } from "shortid";
import { POST } from "../../../utils/aliases";

async function handleUsers(req, res) {
  const client = new MongoClient(process.env.uri, {
    useNewUrlParser: true,
  });

  if (req.method === POST) {
    try {
      const database = client.db(process.env.dbName);
      const collection = database.collection("newsletters");
      const id = generate();
      const response = await collection.insertOne({
        id,
        email: req.body.email,
      });
      res
        .status(201)
        .json({ message: "Post request was successful", response });
    } catch (error) {
      res.status(503).json({ message: "Post request was failure", error });
    } finally {
      await client.close();
    }
  }
}

export default handleUsers;