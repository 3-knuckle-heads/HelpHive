import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userCreateRoute from "./routes/userCreate.route.js";
import userLoginRoute from "./routes/userLogin.route.js";
import userGetRoute from "./routes/userGet.route.js";
import userUpdateRoute from "./routes/userUpdate.route.js";
import eventCreateRoute from "./routes/eventCreate.route.js";
import eventGetRoute from "./routes/eventGet.route.js";
import eventRespondRoute from "./routes/eventRespondRoute.js";
import refreshTokenRoute from "./routes/refreshTokens.route.js";
import geminirouter from "./routes/geminirouter.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}/api/v1/`)
);

app.get("/api/v1/", (req, res) => {
  res.status(200).send("Hello World.");
});

app.use("/api/v1/signup", userCreateRoute);
app.use("/api/v1/login", userLoginRoute);
app.use("/api/v1/get_users", userGetRoute);
app.use("/api/v1/update_user", userUpdateRoute);

app.use("/api/v1/create_event", eventCreateRoute);
app.use("/api/v1/events", eventGetRoute);
app.use("/api/v1/respond_event", eventRespondRoute);

app.use("/api/v1/refresh_tokens", refreshTokenRoute);
app.use("/api/v1/Gemini", geminirouter);

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
const url = process.env.DB_URL;

async function run() {
  try {
    await mongoose.connect(url, clientOptions);
    //  await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);
