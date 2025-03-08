import express from "express";
import cors from "cors";
import multer from "multer";
import { createEvent } from "../controllers/event.controller.js";
import { authenticateToken } from "../Utils/authMiddleware.js";

const route = express.Router();
route.use(cors());

const upload = multer({ dest: "uploads/" });

route.post("/", authenticateToken, upload.single("file"), createEvent);

export default route;
