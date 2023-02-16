import { MongoClient } from "mongodb";
import { generate } from "shortid";
import { POST } from "../../../utils/aliases";
import { hash } from "bcrypt";

async function handleUsers(req, res) {
  const client = new MongoClient(process.env.uri, {
    useNewUrlParser: true,
  });

  if (req.method === POST) {
    try {
      const database = client.db(process.env.dbName);
      const collection = database.collection("users");
      const id = generate();
      const hashedPass = await hash(req.body.password, 10);
      const response = await collection.insertOne({
        id,
        email: req.body.email,
        password: hashedPass,
        iat: Date.now(),
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
