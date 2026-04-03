"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import AuthLayout from "@components/auth/AuthLayout";

type VerifyState = "loading" | "success" | "error" | "expired";

export default function VerifyEmailPage() {
  // In real usage: params come from /verify/[id]/[unique_id] URL
  const [state, setState] = useState<VerifyState>("loading");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate verification attempt
    const timer = setTimeout(() => {
      // API integration goes here — call POST /verify-email with id & unique_id from URL
      setState("success");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const stateContent: Record<VerifyState, { icon: string; title: string; body: string }> = {
    loading: {
      icon: "⏳",
      title: "Verifying your email…",
      body: "Just a moment while we confirm your account.",
    },
    success: {
      icon: "✅",
      title: "Email verified!",
      body: "Your account is now active. You can log in and start managing your tasks.",
    },
    error: {
      icon: "❌",
      title: "Verification failed",
      body: "The link is invalid or has already been used. Try registering again.",
    },
    expired: {
      icon: "⏰",
      title: "Link expired",
      body: "This verification link has expired (links are valid for 6 hours). Please register again to get a new one.",
    },
  };

  const content = stateContent[state];

  return (
    <AuthLayout title={content.title}>
      <div className="flex flex-col items-center text-center gap-6">
        {state === "loading" ? (
          <div className="w-16 h-16 bg-violet-635FC7/10 rounded-full flex items-center justify-center">
            <svg className="animate-spin w-8 h-8 text-violet-635FC7" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </div>
        ) : (
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
            state === "success" ? "bg-green-100 dark:bg-green-900/20" :
            "bg-red-EA5555/10"
          }`}>
            {content.icon}
          </div>
        )}

        <p className="text-[13px] leading-[23px] text-gray-828FA3 max-w-[300px]">
          {content.body}
        </p>

        {state === "success" && (
          <Link
            href="/login"
            className="w-full h-12 rounded-full font-bold text-[15px] bg-violet-635FC7 hover:bg-violet-A8A4FF text-white flex items-center justify-center duration-200"
          >
            Go to login →
          </Link>
        )}

        {(state === "error" || state === "expired") && (
          <Link
            href="/register"
            className="w-full h-12 rounded-full font-bold text-[15px] bg-violet-635FC7 hover:bg-violet-A8A4FF text-white flex items-center justify-center duration-200"
          >
            Register again
          </Link>
        )}

        {/* Dev test buttons */}
        <div className="flex gap-2 flex-wrap justify-center mt-4 pt-4 border-t border-gray-E4EBFA dark:border-gray-3E3F4E w-full">
          <p className="w-full text-xs text-gray-828FA3 mb-1">Preview states:</p>
          {(["loading", "success", "error", "expired"] as VerifyState[]).map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`text-xs px-3 py-1 rounded-full border ${
                state === s
                  ? "border-violet-635FC7 text-violet-635FC7"
                  : "border-gray-828FA340 text-gray-828FA3"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </AuthLayout>
  );
}