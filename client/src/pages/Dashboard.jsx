import { useState, useEffect } from "react";
import { getEvents } from "../../../server/controllers/eventController";
import LifeStats from "../components/LifeStats";
import EventModal from "../components/EventModal";
import { useAuth } from "../context/AuthContext";


const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        setEvents(res.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleModalClose = () => setModalOpen(false);
  const handleEventCreated = () => {
    // Refresh events without full page reload
    getEvents().then(res => setEvents(res.data));
    handleModalClose();
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.email || "Guest"} 👋</h2>

      <button onClick={() => setModalOpen(true)}>+ Add Event</button>

      <EventModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onEventCreated={handleEventCreated}
      />

      <LifeStats birthDate="2000-01-01" />

      <h3>Your Life Events:</h3>
      <ul>
        {events.length > 0 ? (
          events.map((e) => <li key={e._id}>{e.title}</li>)
        ) : (
          <li>No events yet. Add one!</li>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
