import axios from "axios";

export async function getAllEvents() {
  const response = await axios.get(process.env.apiUrl + "/events");
  if (response.status == 500) return { message: "Error while fetching events" };
  return Object.values(response.data.events);
}

export async function getFeaturedEvents() {
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
  const response = await axios.post(process.env.apiUrl + "/users", {
    email,
  });
  if (response.status == 503) {
    throw new Error(response.data.message);
  }
  return response;
}

export async function registerUser({ fullName, email, password }) {
  try {
    const response = await axios.post(process.env.apiUrl + "/users/auth", {
      fullName,
      email,
      password,
    });
    if (response.status == 503) {
      throw new Error(response.data.message);
    }
    return response;
  } catch (err) {
    return err.message;
  }
}

export async function saveComment(eventId, fullName, email, comment) {
  const response = await axios.post(
    process.env.apiUrl + "/comments/" + eventId,
    {
      fullName,
      email,
      comment,
    }
  );
  if (response.status == 503) throw new Error(response.data.message);
  return response;
}

export async function getComments(eventId) {
  const response = await axios.get(process.env.apiUrl + "/comments/" + eventId);
  if (response.status == 500) throw new Error(response.data.message);
  return Object.values(response.data.comments);
}
