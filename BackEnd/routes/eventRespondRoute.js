import express from "express";
import cors from "cors";
import { respondToEventC } from "../controllers/event.controller.js";
import { authenticateToken } from "../Utils/authMiddleware.js";

const route = express.Router();
route.use(cors());

route.patch("/", authenticateToken, respondToEventC);

export default route;
