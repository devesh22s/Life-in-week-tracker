import { useState } from "react";
import axios from "axios";

const EventModal = ({ isOpen, onClose, onEventCreated }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    await axios.post("/api/events", { title });
    onEventCreated();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EventModal;
