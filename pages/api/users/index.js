import { MongoClient } from "mongodb";
import { generate } from "shortid";
import { POST } from "../../../utils/aliases";

async function handleNewsletter(req, res) {
  if (req.method !== POST)
    return res.status(405).json({ message: "Method is not allowed" });
  const client = new MongoClient(process.env.uri, {
    useNewUrlParser: true,
  });

  try {
    const database = client.db(process.env.dbName);
    const collection = database.collection("newsletters");
    const id = generate();
    const response = await collection.insertOne({
      id,
      email: req.body.email,
    });
    res.status(201).json({ message: "Registration completed", response });
  } catch (err) {
    res.status(503).json({ message: "Registration was failure", err });
  } finally {
    await client.close();
  }
}

export default handleNewsletter;
