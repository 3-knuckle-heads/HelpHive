import express, { Router } from "express";
import createUser from "../services/signup";

const router = express.Router();

router.post("/signup", createUser);

module.exports = router;
