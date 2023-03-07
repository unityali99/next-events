import { MongoClient } from "mongodb";
import { PUT } from "../../../utils/aliases";
import { compare, hash } from "bcrypt";

async function handleResetPass(req, res) {
  if (req.method !== PUT)
    return res.status(405).json({ message: "Method is not allowed" });
  const client = new MongoClient(process.env.uri, {
    useNewUrlParser: true,
  });

  try {
    const database = client.db(process.env.dbName);
    const collection = database.collection("users");
    const user = await collection.findOne({ email: req.body.email });
    if (!(await compare(req.body.oldPass, user.password)))
      return res.status(401).json({ message: "Current password is incorrect" });
    const response = await collection.updateOne(
      { email: req.body.email },
      { $set: { password: hash(req.body.newPass) } }
    );
    res
      .status(200)
      .json({ message: "Password changed successfully", response });
  } catch (error) {
    res.status(503).json({ message: "Unexpected error occured", error });
  } finally {
    await client.close();
  }
}

export default handleResetPass;
