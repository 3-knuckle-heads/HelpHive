import express from "express";
import cors from "cors";
import { createEvent } from "../controllers/event.controller.js";
import { authenticateToken } from "../Utils/authMiddleware.js";

const route = express.Router();
route.use(cors());

route.post("/", authenticateToken, createEvent);

export default route;
