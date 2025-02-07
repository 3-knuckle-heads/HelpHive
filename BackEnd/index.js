// Import necessary modules
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

// Initialize the app
const app = express();

// Set the port to listen on
const PORT = 4000;

// Middleware for handling CORS
app.use(cors());

// Endpoint for getting suggestions from the AI
app.get("/api/suggestions", async (req, res) => {
  // OpenAI API key (replace with your actual API key)
  const OPENAI_API_KEY = "your_openai_api_key";
  
  // Initialize OpenAI API client
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  
  // Model selection
  const aiModel = "gpt-3.5-turbo-preview";
  
  // Retrieve the 'text' parameter from the query string
  const text = req.query.text;

  // Check if text input is provided
  if (text && text.length) {
    const prompt = [
      'You are an autocomplete assistant.',
      'For the text content I provide as input, please give me a single text suggestion ranging from 2 to 8 words.',
      'Start with a white space if needed.',
      'Start with a new line if needed.',
      'All the words should be complete.',
      'DO NOT give more than one suggestion.',
      'Do not add any names. Do Not add full stops in the end.'
    ];

    const messages = [
      {
        role: "system",
        content: prompt.join(' '),
      },
      {
        role: "user",
        content: text,
      },
    ];

    try {
      // Make the request to OpenAI
      const completion = await openai.chat.completions.create({
        model: aiModel,
        messages: messages,
      });

      // Extract the AI response and send it to the client
      const aiResponse = completion.choices[0].message.content;
      res.json({ aiResponse });

    } catch (error) {
      // Handle errors if the request to OpenAI fails
      console.error("Error generating completion:", error);
      res.status(500).json({ message: "An error occurred while generating the suggestion." });
    }
  } else {
    // Handle the case where no text is provided
    res.status(400).json({ message: 'No input text provided.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
