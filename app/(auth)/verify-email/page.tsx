import Link from "next/link";

import AuthLayout from "@components/auth/AuthLayout";
import { verifyEmail } from "app/server-actions/authActions";

type VerifyState = "loading" | "success" | "error" | "expired";

export default async function VerifyEmailPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const id = searchParams?.id ?? "";
  const uniqueId = searchParams?.uniqueId ?? "";
  let state: VerifyState = "loading";

  if (id && uniqueId) {
    const res = await verifyEmail({ id, uniqueId });
    if (res?.data) {
      state = "success";
    } else {
      if (res?.message?.includes("expired")) {
        state = "expired";
      } else {
        state = "error";
      }
    }
  }


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
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : (
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${state === "success" ? "bg-green-100 dark:bg-green-900/20" :
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
      </div>
    </AuthLayout>
  );
}