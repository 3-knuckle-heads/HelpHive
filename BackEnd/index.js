const express = require("express");
const app = express();

const cors = require("cors");
const openai = require("openai");
const { default: OpenAI } = require("openai/index.mjs");
const fs = require (fs);

const port = 4000;
app.use(cors());

app.get("/api/faq",async(req,res)=>
{
  const question = req.query.question;
  fs.readFile("server/company/feathures.txt","utf8",async(err,data)=>
  {
    if(err)
      {
        console.error("Error reading the file:",err);
        return; 
      }
      if(question && question.length){
        const OPENAI_API_KEY = "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"
        const openai = new OpenAI({apiKey:OPENAI_API_KEY});
        const ai_model = "gpt-3.5-turbo-1106";

        const prompt=[];
        prompt.push("you are a company's support specialist available to answer any question.your ques mustbe on company details nothing else");
        prompt.push("politely decline if the question doesnot match the following");
        prompt.push(data);

        const message = [
          {
            role : "system",
            content : prompt.join(" "),

          },
          {
            role : "user",
            content : question,

          },
        ];
        const completion = await openai.chat.completions.create({
          model:ai_model,
          messages:message
        });
        const airesponse = completion.choices[0].message.content
        res.json({airesponse});

      }else{
        res.json ({message:"no question is provided"})
      }
  })
})
app.listen(port,()=>console.log(`server running on port ${port}`));