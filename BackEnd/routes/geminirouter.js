import express from "express";
import cors from "cors";

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
        parts: [{ text: "test" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, I'm ready.  What would you like me to do?  Please provide me with a specific instruction or question.\n",
          },
        ],
      },

      {
        role: "user",
        parts: [
          {
            text: '**what is help-hive? **Help hive is a volunteer connecting website where event organizers meet volunteers**.**How do I register for an event?** 8To register for an event, simply log in to your Help-Hive account, find the event you want to join, and click the "Register" button. You\'ll receive a confirmation email with further details. **What are the requirements to become a volunteer?**   - Volunteers should be passionate about helping others, reliable, and willing to commit their time and effort to support various events. Some events may have specific requirements, which will be listed in the event details. **Can I volunteer for multiple events at the same time?**   - Yes, you can volunteer for multiple events as long as you can manage your time and commitments effectively. Please ensure you can attend all events you sign up for. **How can I cancel my participation in an event?**   - If you need to cancel your participation in an event, log in to your account, go to your registered events, and click "Cancel" next to the event you wish to withdraw from. Please provide a reason for cancellation if possible. **Are there any training sessions for volunteers?**   - Some events may offer training sessions to prepare volunteers for their roles. Check the event details or contact the event host for more information on available training sessions. **How do I contact the event host?**   - You can contact the event host through the Help-Hive platform by navigating to the event page and clicking the "Contact Host" button. You can send them a message with any questions or concerns. **Can I share my volunteer experience on social media?**   - Absolutely! We encourage volunteers to share their experiences on social media using the hashtag #HelpHive. Be sure to tag us in your posts so we can see and share your contributions. **What measures are in place to ensure the safety of volunteers and participants?**   - Help-Hive prioritizes the safety of all volunteers and participants. We have guidelines and protocols in place, and event hosts are required to follow these to ensure a safe and secure environment for everyone involved.\n\nAbsolutely, **Can I donate to support Help-Hive\'s mission?**   - Yes, you can donate to Help-Hive through our website. Your contributions help us organize more events and support those in need. **How are events selected for the platform?**    - Events are reviewed and approved by our team to ensure they align with our mission and guidelines. We prioritize events that have a positive impact on the community. **Can I edit my event listing after it\'s been published?**    - Yes, you can edit your event listing by logging into your account, navigating to your event, and making the necessary changes. Be sure to save your updates. **What if I have a question that\'s not listed in the FAQs?**    - If you have a question that\'s not covered in the FAQs, you can contact our support team through the "Contact Us" page on our website. **How do I report inappropriate behavior or content?**    - If you encounter inappropriate behavior or content, please report it to our support team immediately. We take such reports seriously and will take appropriate action. **Can I leave a review for an event I participated in?**    - Yes, we encourage volunteers and participants to leave reviews for events they attended. Your feedback helps improve future events and assists others in choosing events to join. **What types of events can I host on Help-Hive?**    - You can host various types of events, such as charity fundraisers, community cleanups, educational workshops, and more. As long as the event aligns with our mission, it\'s welcome on our platform. **How do I know if my event application has been approved?**    - You will receive an email notification once your event application has been reviewed and approved by our team. You can also check the status of your application in your account. **Are there any age restrictions for volunteers?**    - Some events may have age restrictions due to the nature of the activities. These restrictions will be listed in the event details. Volunteers under 18 may need parental consent to participate. **Can I invite friends to join an event with me?**    - Yes, you can invite friends to join events by sharing the event link with them. Encourage them to sign up and participate! **How do I update my profile information?**    - To update your profile information, log into your account, go to your profile settings, and make the necessary changes. Don\'t forget to save your updates. **Can I volunteer remotely?**    - Yes, some events offer remote volunteering opportunities. Look for events with remote options in their descriptions. **What are the benefits of volunteering with Help-Hive?**    - Volunteering with Help-Hive allows you to make a positive impact, connect with like-minded individuals, gain new skills, and contribute to your community.\n\n22. **How do I unsubscribe from the newsletter?**    - If you no longer wish to receive our newsletter, you can unsubscribe by clicking the "Unsubscribe" link at the bottom of any newsletter email. **Can organizations collaborate with Help-Hive?**    - Yes, we welcome collaborations with organizations that share our mission. Contact us through our website to discuss partnership opportunities. **How can I share my event on social media?**    - To share your event on social media, go to your event page and use the social media sharing buttons. You can also copy the event link and share it manually. **What if I have technical issues with the Help-Hive website?**    - If you encounter technical issues, please contact our support team through the "Contact Us" page. Provide as much detail as possible so we can assist you promptly.u should ans only this ques if any user asked excluding these ques u just say it is unnecessary for this web',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, I understand.  I will only answer questions from users that are in the list you provided.  If a user asks a question not on the list, I will respond that it is unnecessary for this website.\n",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

geminirouter.post("/prompt-post", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await run(prompt);
    return res.json({ answer: response }); // Assuming run returns the text directly now
  } catch (error) {
    console.error("Error in /prompt-post:", error); // Log the full error
    return res
      .status(500)
      .json({ error: "Failed to generate: " + error.message }); // Send error message
  }
});

export default geminirouter;
