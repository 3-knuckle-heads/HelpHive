import React from "react";

const Faq = () => {
  const faqs = [
    {
      question: "What is Help-Hive?",
      answer:
        "Help-Hive is a platform where volunteers and event organizers come together to support those in need by hosting and participating in various events.",
    },
    {
      question: "How can I become a volunteer?",
      answer:
        "Simply sign up on our website, create a profile, and browse available volunteer opportunities to join and contribute.",
    },
    {
      question: "Can I host an event on Help-Hive?",
      answer:
        "Yes! If you have a cause or event idea, you can apply to become an event host, create an event listing, and recruit volunteers.",
    },
    {
      question: "Is there any cost to join Help-Hive?",
      answer:
        "No, joining Help-Hive as a volunteer or event host is completely free! Our goal is to connect people who want to make a difference.",
    },
    {
      question: "How do I stay updated on upcoming events?",
      answer:
        "You can subscribe to our newsletter, follow us on social media, or check the events page regularly for new opportunities.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-10 px-5 min-h-screen bg-gradient-to-r from-blue-900 to-blue-900 text-white">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">
        Frequently Asked <span className="italic text-yellow-300">Questions</span>
      </h1>
      <div className="w-full max-w-3xl">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700 py-4">
            <button className="w-full text-left text-lg font-semibold text-yellow-300 focus:outline-none">
              {faq.question}
            </button>
            <p className="mt-2 text-gray-200 text-base">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Faq



