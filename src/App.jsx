import { useEffect, useState } from "react";
import { getGuests, getGuest } from "./guest-list";
import "./index.css";

export default function App() {
  const [guestId, setGuestId] = useState(null);
  return (
    <>
      <h1>Guest List</h1>
      <section>
        <h2>Name</h2> <h2>Email</h2> <h2>Phone</h2>
      </section>
      <GuestList setGuestId={setGuestId} />
      <GuestDetails guestId={guestId} />
    </>
  );
}

function GuestList({ setGuestId }) {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const syncGuests = async () => {
      const data = await getGuests();
      setGuests(data);
    };
    syncGuests();
  }, []);

  return (
    <ul className="guests">
      {guests.map((guest) => (
        <li key={guest.id} onClick={() => setGuestId(guest.id)}>
          <h3>
            {guest.name} #{guest.id}
          </h3>{" "}
          <h3>{guest.email}</h3> <h3>{guest.phone}</h3>
        </li>
      ))}
    </ul>
  );
}

function GuestDetails({ guestId }) {
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const syncGuest = async () => {
      if (!guestId) return;

      const data = await getGuest(guestId);
      setGuest(data);
    };
    syncGuest();
  }, [guestId]);

  if (!guest) {
    return <p>Select a guest to see more details.</p>;
  }

  return (
    <div className="guests">
      <h2>
        {guest.name} #{guest.id}
      </h2>
      <p>
        <strong>Email:</strong> {guest.email}
      </p>
      <p>
        <strong>Phone:</strong> {guest.phone}
      </p>
      <p>
        <strong>Job:</strong> {guest.job}
      </p>
      <p>
        <strong>Bio:</strong> {guest.bio}
      </p>
      <button onClick={() => setGuest(null)}>Back to list</button>
    </div>
  );
}
