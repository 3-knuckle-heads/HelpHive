import express from "express";
import cors from "cors";
import { getAllUsers } from "../controllers/user.controller.js";
import { authenticateToken } from "../Utils/authMiddleware.js";

const route = express.Router();
route.use(cors());

route.get("/", authenticateToken, getAllUsers);

export default route;
