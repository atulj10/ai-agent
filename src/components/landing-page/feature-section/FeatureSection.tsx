"use client";
import { Database, FileText, Globe } from "lucide-react";
import React, { useState } from "react";
import pdfAnalysisImg from "../../../assets/pdf-anaylsis.png";
import excelProcessing from "../../../assets/excel-processing.jpg";
import websiteProcessing from "../../../assets/website-processing.jpg";

function FeatureSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: FileText,
      title: "PDF Analysis",
      description:
        "Upload PDFs and get instant insights. Our AI agent reads through documents and extracts valuable information.",
      image: pdfAnalysisImg,
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Database,
      title: "Excel Processing",
      description:
        "Connect Excel spreadsheets and ask questions in plain English. Get answers from your data without complex formulas.",
      image: excelProcessing,
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Globe,
      title: "Website Analysis",
      description:
        "Provide a URL and our AI will analyze the website content to answer your specific questions.",
      image: websiteProcessing,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="py-20 bg-[#0f0f14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Analyze Any Data Source
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Our AI agent seamlessly processes multiple data formats, making it
            easy to get answers no matter how your information is stored.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature List */}
          <div className="space-y-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;

              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? "bg-[#282A36] shadow-lg border border-[#5147f3]/20"
                      : "hover:bg-[#18181B]"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${feature.title}`}
                >
                  <div className="flex items-start">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Image */}
          <div className="lg:pl-8">
            <div
              className={`rounded-2xl overflow-hidden shadow-2xl border border-[#282A36] bg-[#18181B] relative`}
            >
              {/* <div
                className={`h-2 w-full bg-gradient-to-r ${features[activeFeature].color}`}
              ></div> */}
              <img
                src={features[activeFeature].image.src} // Ensure this works with your image import
                alt={features[activeFeature].title}
                className="h-96 object-cover w-full  p-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;
