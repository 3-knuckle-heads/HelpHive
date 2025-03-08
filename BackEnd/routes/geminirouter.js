import express from "express";
import cors from "cors";
// import { run } from "../services/geminiapi.js";
// const run = require("./")

const geminirouter = express.Router();

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.Gemini_Api_Key;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [

      {
        role: "user",
        parts: [
          {
            text: "just answer question on recipe and must about all the questions",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return result.response.text();
}

geminirouter.post("/prompt-post", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await run(prompt);
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
});
export default geminirouter;
