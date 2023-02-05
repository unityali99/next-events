import { MongoClient, ServerApiVersion } from "mongodb";
import { generate } from "shortid";
import { POST } from "../../utils/aliases";
import { dbName, uri } from "../../utils/api";

async function handleUsers(req, res) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  });

  if (req.method === POST) {
    try {
      const database = client.db(dbName);
      const collection = database.collection("users");
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
