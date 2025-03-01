import express from "express";
import cors from "cors";
import { createUser } from "../controllers/user.controller.js";

const route = express.Router();
route.use(cors());

route.post("/", createUser);

export default route;
