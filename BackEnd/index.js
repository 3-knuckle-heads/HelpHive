import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

const port = 4000;

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}/api/v1/`)
);

app.get("/api/v1/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/api/v1/login", (req, res) => {
  const username = req.body.username;
  const user = {
    name: username,
  };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  res.status(200).json({
    accessToken: accessToken,
  });
});
