import express from "express";
const app = express();

import cors from "cors";
import openai from "openai";
import { default as OpenAI } from "openai/index.mjs";
import fs from "fs";

const port = 4000;
app.use(cors());

app.get("/api/faq", async (req, res) => {
  const question = req.query.question;
  fs.readFile("server/company/feathures.txt", "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    if (question && question.length) {
      const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
      const ai_model = "gpt-3.5-turbo-1106";
      // apiKey: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;
      const secret =
        sk -
        proj -
        IipSA8ecgO25uWgO0s1FfZGPrDzVCytZalMydAD -
        y5HiqzH0zY4 -
        ItXcDfSnWUbkYO5EpBDyIUT3BlbkFJar_ -
        CQ6UsQtK6x4IUvKrwcYFDojiikUF5mRc11E -
        XdZX4FZuBxiWnVuXMw5wG -
        b2hgkaIv3UgA;

      const prompt = [];
      prompt.push(
        "you are a company's support specialist available to answer any question.your ques mustbe on company details nothing else"
      );
      prompt.push(
        "politely decline if the question doesnot match the following"
      );
      prompt.push(data);

      const message = [
        {
          role: "system",
          content: prompt.join(" "),
        },
        {
          role: "user",
          content: question,
        },
      ];
      const completion = await openai.chat.completions.create({
        model: ai_model,
        messages: message,
      });
      const airesponse = completion.choices[0].message.content;
      res.json({ airesponse });
    } else {
      res.json({ message: "no question is provided" });
    }
  });
});
app.listen(port, () => console.log(`server running on port ${port}`));
