import { ArrowRight, Bot } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#5147f3]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -left-20 w-72 h-72 bg-[#5147f3]/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#5147f3]/10 text-[#7f73ff] mb-4">
                Powered by Gemini AI
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Get answers from your
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5147f3] to-[#7f73ff]">
                  {" "}
                  data
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-2xl">
                Upload files, connect spreadsheets, or analyze websites. Ask
                questions in plain English and get instant insights from your
                data.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href={"/login"}>
                  <button className="px-8 py-4 bg-gradient-to-r from-[#5147f3] to-[#6c63ff] text-white font-medium rounded-xl shadow-lg shadow-[#5147f3]/20 hover:shadow-xl hover:shadow-[#5147f3]/30 transition-all flex items-center justify-center">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
                <button className="px-8 py-4 bg-[#282A36] text-white font-medium rounded-xl hover:bg-[#32343F] transition-all flex items-center justify-center">
                  See Demo
                </button>
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#282A36]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#18181B]/80 to-[#121218]/80 backdrop-blur-sm z-10">
                  <div className="flex flex-col h-full p-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="max-w-md mx-auto w-full space-y-6">
                        <div className="bg-[#282A36] p-4 rounded-lg">
                          <p className="text-gray-300">
                            Upload your data to analyze
                          </p>
                          <div className="mt-3 border-2 border-dashed border-[#5147f3]/30 rounded-lg p-6 text-center">
                            <Bot className="h-10 w-10 text-[#5147f3] mx-auto mb-2" />
                            <p className="text-gray-400 mb-1">
                              Drop your PDF, Excel or paste a URL
                            </p>
                            <button className="mt-2 px-4 py-2 bg-[#5147f3]/20 text-[#7f73ff] text-sm rounded-lg">
                              Browse Files
                            </button>
                          </div>
                        </div>
                        <div className="bg-[#282A36] p-4 rounded-lg">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#5147f3] to-[#7f73ff] flex items-center justify-center">
                                <Bot className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <p className="text-white">
                                How can I help with your data today?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src="/api/placeholder/800/600"
                  alt="AI Data Interface"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
