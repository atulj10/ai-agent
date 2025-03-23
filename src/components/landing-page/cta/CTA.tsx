import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function CTA() {
  return (
    <div className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#18181B] to-[#121218] border border-[#282A36] rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#5147f3]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#5147f3]/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to get started with AI-powered data analysis?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Sign up now and analyze your first document in minutes. No credit
              card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"/main/dashboard"}>
                <button className="px-8 py-4 bg-gradient-to-r from-[#5147f3] to-[#6c63ff] text-white font-medium rounded-xl shadow-lg shadow-[#5147f3]/20 hover:shadow-xl hover:shadow-[#5147f3]/30 transition-all flex items-center justify-center">
                  Start for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <button className="px-8 py-4 bg-[#282A36] text-white font-medium rounded-xl hover:bg-[#32343F] transition-all flex items-center justify-center">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTA;
