"use client";
import React from "react";
import FAQSection from "@/components/landing-page/faq/FAQSection";
import FeatureSection from "@/components/landing-page/feature-section/FeatureSection";
import HeroSection from "@/components/landing-page/hero-section/HeroSection";
import HowItWork from "@/components/landing-page/how-it-work/HowItWork";
import Testimonials from "@/components/landing-page/testimonials/Testimonials";
import CTA from "@/components/landing-page/cta/CTA";
import Footer from "@/components/landing-page/footer/Footer";

export default function LandingPage() {
  return (
    <div className="bg-[#121218] min-h-screen w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* How It Works Section */}
      <HowItWork />

      {/* Testimonials/Use Cases */}
      <Testimonials />

      {/* CTA Section */}
      <CTA />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
