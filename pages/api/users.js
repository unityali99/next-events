import { child, push } from "firebase/database";
import { generate } from "shortid";
import { dbRef } from "../../utils/api";

async function handleUsers(req, res) {
  if (req.method === "POST") {
    const id = generate();
    const user = { [id]: req.body.email };
    await push(child(dbRef, "users"), user)
      .then(() => {
        res
          .status(201)
          .json({ message: "Registered successfully.", body: user });
      })
      .catch((err) => {
        res.status(503).json({ message: err.message });
      });
  }
}

export default handleUsers;
