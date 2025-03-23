import React from "react";

function HowItWork() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Three simple steps to get insights from your data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Upload Your Data",
              description:
                "Drag and drop your PDF, Excel file, or paste a website URL",
            },
            {
              step: "02",
              title: "Ask Questions",
              description: "Type questions in natural language about your data",
            },
            {
              step: "03",
              title: "Get Insights",
              description:
                "Receive clear answers and actionable insights instantly",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#18181B] border border-[#282A36] rounded-xl p-6 relative"
            >
              <div className="absolute -top-5 -right-3 bg-[#5147f3] text-white text-xl font-bold py-2 px-4 rounded-lg">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-white mt-4 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWork;
