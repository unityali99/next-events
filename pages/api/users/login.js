import { MongoClient } from "mongodb";
import { POST } from "../../../utils/aliases";
import { compare } from "bcrypt";

async function handleLogin(req, res) {
  if (req.method !== POST)
    return res.status(405).json({ message: "Method is not allowed" });
  const client = new MongoClient(process.env.uri, {
    useNewUrlParser: true,
  });

  try {
    const database = client.db(process.env.dbName);
    const collection = database.collection("users");
    const user = await collection.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    if (await compare(req.body.password, user.password))
      res.status(200).json({ message: "Login successful" });
    else res.status(401).json({ message: "Incorrect password" });
  } catch (error) {
    res.status(503).json({ message: "Login was failure", error });
  } finally {
    await client.close();
  }
}

export default handleLogin;
