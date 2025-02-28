import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT;

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

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const url = process.env.DB_URL;

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(url, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
