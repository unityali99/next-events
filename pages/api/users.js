import { initializeApp } from "firebase/app";
import { getDatabase, push, ref } from "firebase/database";
import { generate } from "shortid";

async function handleUsers(req, res) {
  const firebaseConfig = {
    databaseURL:
      "https://next-events-6d4c3-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "next-events-6d4c3",
  };
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  if (req.method === "POST") {
    const id = generate();
    const user = { [id]: req.body.email };
    await push(ref(db, "users"), user)
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
