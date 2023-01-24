import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { dbId, dbUrl } from "../../../utils/api";
async function handleComments(req, res) {
  const firebaseConfig = {
    databaseURL: dbUrl,
    projectId: dbId,
  };
  const app = initializeApp(firebaseConfig);
  const dbRef = ref(getDatabase(app));

  if (req.method === "GET") {
    try {
      const snapshot = await get(child(dbRef, "events/" + req.query.eventId));

      if (snapshot.exists())
        res.status(200).json({
          message: "Get request successful",
          body: { comments: snapshot.val() },
        });
      else
        res.status(404).json({
          message: "Get request failed: Data not found",
        });
    } catch (error) {
      res.status(500).json({
        message: "Error during get request",
        error,
      });
    }
  }

  if (req.method === "post") {
  }
}

export default handleComments;
