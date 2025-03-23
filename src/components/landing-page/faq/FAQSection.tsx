"use client";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons for accordion
import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track which FAQ is open

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="py-20 bg-[#0f0f14]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              question: "What file formats are supported?",
              answer:
                "Currently, we support PDF documents, Excel spreadsheets (.xlsx, .xls, .csv), and website URLs. We're constantly expanding our supported formats based on user feedback.",
            },
            {
              question: "How accurate is the AI in understanding my data?",
              answer:
                "Our Gemini-powered AI has been trained on a wide variety of document types and data formats. It typically provides high accuracy for most business documents, with performance improving as it learns from more examples.",
            },
            {
              question: "Is my data secure?",
              answer:
                "Yes, we take data security very seriously. Your files are encrypted both in transit and at rest. We don't store your data longer than necessary for processing, and you can delete your data at any time.",
            },
            {
              question: "Are there any limits on file size?",
              answer:
                "Free accounts can upload files up to 10MB. Premium plans allow for larger file sizes and batch processing of multiple documents.",
            },
            {
              question: "How do I get started?",
              answer:
                "Simply create a free account, then upload your document or paste a URL. You can immediately start asking questions about your data and receive AI-generated insights.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#18181B] border border-[#282A36] rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-white">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
