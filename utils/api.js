import axios from "axios";

export async function getAllEvents() {
  try {
    const { data } = await axios.get(
      "https://next-events-6d4c3-default-rtdb.europe-west1.firebasedatabase.app/events.json"
    );
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
  const response = await axios.post("http://localhost:3000/api/users", {
    email,
  });
  if (response.status == 503) {
    throw new Error(response.data.message);
  }
  return response;
}
