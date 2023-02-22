import { MongoClient } from "mongodb";

async function getEventById(req, res) {
  const client = new MongoClient(process.env.uri, { useNewUrlParser: true });
  const { eventId } = req.query;
  try {
    const db = client.db(process.env.dbName);
    const collection = db.collection("events");
    const event = await collection.findOne({ id: eventId });
    if (!event)
      return res
        .status(404)
        .json({ message: "Event was not found", event: null });
    res.status(200).json({ message: "Get request was successful", event });
  } catch (err) {
    res.status(500).json({ message: "Get request was failure", err });
  } finally {
    await client.close();
  }
}

export default getEventById;
