import { MongoClient } from "mongodb";
import { generate } from "shortid";
import { POST } from "../../../utils/aliases";
import { hash } from "bcrypt";

async function handleRegistration(req, res) {
  const client = new MongoClient(process.env.uri, {
    useNewUrlParser: true,
  });

  if (req.method === POST) {
    try {
      const database = client.db(process.env.dbName);
      const collection = database.collection("users");
      const user = await collection.findOne({ email: req.body.email });
      if (user) return res.status(409).json({ message: "User already exists" });
      const id = generate();
      const hashedPass = await hash(req.body.password, 10);
      const response = await collection.insertOne({
        id,
        fullName: req.body.fullName.trim(),
        email: req.body.email.trim().toLowerCase(),
        password: hashedPass,
        iat: Date.now(),
      });
      res.status(201).json({ message: "Registration completed", response });
    } catch (error) {
      res.status(503).json({ message: "Registration was failure", error });
    } finally {
      await client.close();
    }
  }
}

export default handleRegistration;
