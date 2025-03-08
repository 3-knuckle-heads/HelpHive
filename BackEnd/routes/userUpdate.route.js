import express from "express";
import cors from "cors";
import multer from "multer";
import { updateUser } from "../controllers/user.controller.js";
import { authenticateToken } from "../Utils/authMiddleware.js";

const route = express.Router();
route.use(cors());

const upload = multer({ dest: "uploads/" });

route.put("/", authenticateToken, upload.single("file"), updateUser);

export default route;
