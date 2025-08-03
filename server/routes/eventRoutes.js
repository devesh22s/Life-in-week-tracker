import express from "express";
import { createEvent, getEvents } from "../controllers/eventController.js";
import auth from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", auth, createEvent);
router.get("/", auth, getEvents);

export default router;