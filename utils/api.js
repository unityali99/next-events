import axios from "axios";
import { getDatabase, ref } from "firebase/database";
import { initializeApp } from "firebase/app";

const dbUrl =
  "https://next-events-6d4c3-default-rtdb.europe-west1.firebasedatabase.app/";

export const apiUrl = "http://localhost:3000/api";

const dbId = "next-events-6d4c3";

const firebaseConfig = {
  databaseURL: dbUrl,
  projectId: dbId,
};
const app = initializeApp(firebaseConfig);
export const dbRef = ref(getDatabase(app));

export async function getAllEvents() {
  try {
    const { data } = await axios.get(dbUrl + "/events.json");
    const events = [];
    for (const key in data) {
      events.push(data[key]);
    }
    return events;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

export async function getFeaturesEvents() {
  const allEvents = await getAllEvents();
  if (!allEvents) return null;
  const featuredEvents = allEvents.filter((value) => value.isFeatured);

  return featuredEvents;
}

export async function getFilteredEvents(year, month) {
  const allEvents = await getAllEvents();
  if (!allEvents) return null;
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  if (!allEvents) return null;
  return allEvents.find((event) => event.id === id);
}

export async function saveUser(email) {
  const response = await axios.post(apiUrl + "/users", {
    email,
  });
  if (response.status == 503) {
    throw new Error(response.data.message);
  }
  return response;
}
