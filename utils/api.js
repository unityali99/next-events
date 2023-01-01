import axios from "axios";

export async function getAllEvents() {
  const { data } = await axios.get(
    "https://next-events-6d4c3-default-rtdb.europe-west1.firebasedatabase.app/.json"
  );
  const events = [];
  for (const key in data) {
    events.push(data[key]);
  }
  console.log(events);
  return events;
}

export async function getFeaturesEvents() {
  const allEvents = await getAllEvents();
  const featuredEvents = allEvents.filter((value) => value.isFeatured);

  return featuredEvents;
}

export async function getFilteredEvents({ year, month }) {
  const allEvents = await getAllEvents();

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
  return allEvents.find((event) => event.id === id);
}
