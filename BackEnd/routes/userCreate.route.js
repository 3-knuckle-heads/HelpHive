import express from "express";
import createUser from "../controllers/user.controller.js";

const route = express.Router();

route.post("/", createUser);

// module.exports = userCreateRoute;
export default route;
