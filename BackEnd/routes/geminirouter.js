import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const geminirouter = express.Router();

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.Gemini_Api_Key;

if (!apiKey) {
  console.error("Missing Gemini API Key. Set Gemini_Api_Key in .env");
  process.exit(1);
}

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
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: "test" }],
        },
        {
          role: "model",
          parts: [{ text: "Okay, I'm ready. What would you like me to do?" }],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);

    if (!result.response) {
      throw new Error("Invalid response from Gemini AI");
    }

    return result.response.text(); // Ensure this returns expected output
  } catch (error) {
    console.error("Error generating response:", error);
    return "Failed to process request.";
  }
}

geminirouter.post("/prompt-post", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await run(prompt);
    return res.json({ answer: response });
  } catch (error) {
    console.error("Error in /prompt-post:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default geminirouter;
