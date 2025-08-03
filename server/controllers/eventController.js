import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  const event = new Event({ ...req.body, user: req.user.id });
  await event.save();
  res.status(201).json(event);
};

export const getEvents = async (req, res) => {
  const events = await Event.find({ user: req.user.id });
  res.json(events);
};