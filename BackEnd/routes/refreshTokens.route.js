import express from "express";
import cors from "cors";
import { refreshAllTokens } from "../controllers/refresh.controller.js";

const route = express.Router();
route.use(cors());

route.post("/", refreshAllTokens);

export default route;
