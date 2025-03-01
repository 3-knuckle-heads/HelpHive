import express from "express";
import cors from "cors";
import { loginUser } from "../controllers/user.controller.js";

const route = express.Router();
route.use(cors());

route.post("/", loginUser);

export default route;
