import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is working",
  });
});

app.listen(PORT, () => {
  console.log("Server is listening to port: " + PORT);
});
