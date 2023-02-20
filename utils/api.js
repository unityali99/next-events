import axios from "axios";

export async function getAllEvents() {
  const response = await axios.get(process.env.apiUrl + "/events");
  if (response.status == 500) return { message: "Error while fetching events" };
  return Object.values(response.data.events);
}

export async function getFeaturedEvents() {
  try {
    const response = await axios.get(
      process.env.apiUrl + "/events/featuredEvents"
    );
    return response.data.events;
  } catch (err) {
    return err;
  }
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

export async function getEventById(eventId) {
  try {
    const response = await axios.get(process.env.apiUrl + `/events/${eventId}`);
    return response.data.event;
  } catch (err) {
    return err;
  }
}

export async function saveUser(email) {
  try {
    const response = await axios.post(process.env.apiUrl + "/users", {
      email,
    });
    return response;
  } catch (err) {
    return err;
  }
}

export async function registerUser({ fullName, email, password }) {
  try {
    const response = await axios.post(process.env.apiUrl + "/users/register", {
      fullName,
      email,
      password,
    });
    return response;
  } catch (err) {
    return err;
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post(process.env.apiUrl + "/users/login", {
      email,
      password,
    });
    return response;
  } catch (err) {
    return err;
  }
}

export async function saveComment(eventId, fullName, email, comment) {
  try {
    const response = await axios.post(
      process.env.apiUrl + "/comments/" + eventId,
      {
        fullName,
        email,
        comment,
      }
    );
    return response;
  } catch (err) {
    return err;
  }
}

export async function getComments(eventId) {
  const response = await axios.get(process.env.apiUrl + "/comments/" + eventId);
  if (response.status == 500) throw new Error(response.data.message);
  return Object.values(response.data.comments);
}
