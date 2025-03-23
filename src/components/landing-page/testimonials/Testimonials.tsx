import { Bot, CheckCircle, Database, FileText, Globe } from "lucide-react";
import React from "react";

function Testimonials() {
  return (
    <div className="py-20 bg-[#0f0f14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What You Can Do
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Discover how our AI-powered data assistant helps in various
            scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: FileText,
              title: "Research Documents",
              description:
                "Extract key findings from research papers and reports without reading hundreds of pages",
            },
            {
              icon: Database,
              title: "Financial Analysis",
              description:
                "Ask questions about financial data and get insights without complex Excel formulas",
            },
            {
              icon: Globe,
              title: "Competitive Research",
              description:
                "Analyze competitor websites and generate reports on their offerings",
            },
            {
              icon: Bot,
              title: "Customer Feedback",
              description:
                "Process survey results and identify patterns from customer responses",
            },
            {
              icon: CheckCircle,
              title: "Legal Document Review",
              description:
                "Review contracts and legal documents for specific clauses or terms",
            },
            {
              icon: Database,
              title: "Data Visualization",
              description:
                "Turn complex data into visual insights and digestible information",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#18181B] border border-[#282A36] rounded-xl p-6 hover:shadow-lg hover:shadow-[#5147f3]/5 hover:border-[#5147f3]/20 transition-all hover:scale-[1.01]"
              >
                <Icon className="h-8 w-8 text-[#5147f3] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
