"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LucideUser,
  LucideMail,
  LucideLock,
  LucideEye,
  LucideEyeOff,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted

    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Redirecting to login...");
        router.push("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-[#0A0A0A] text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#121212] p-8 rounded-2xl shadow-xl lg:w-[30%] w-[70%] border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-center mb-10">
          Get started on AI-Agent
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <LucideUser
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 bg-[#1E1E1E] border border-gray-700 text-white"
              required
            />
          </div>

          <div className="relative">
            <LucideMail
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-[#1E1E1E] border border-gray-700 text-white"
              required
            />
          </div>

          <div className="relative">
            <LucideLock
              className="absolute left-3 top-[20%] text-gray-400"
              size={20}
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-[#1E1E1E] border border-gray-700 text-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[20%] text-gray-400 focus:outline-none"
            >
              {showPassword ? (
                <LucideEyeOff size={20} />
              ) : (
                <LucideEye size={20} />
              )}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#5147f3] hover:bg-[#4236e0] text-white font-semibold p-3 rounded-lg flex items-center justify-center"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="h-10 w-10 text-[#5147f3] animate-spin mb-4" />
                Signing up...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-[#5147f3] hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
