"use client";

import { toast } from "sonner";
import { useState } from "react";

import { Button, Input } from "@components/common";
import AuthLayout from "@components/auth/AuthLayout";
import { useSendPasswordResetEmail } from "@hooks/useAuth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [ sent, setSent] = useState(false);
  const { mutateAsync: forgotPassword, isPending } = useSendPasswordResetEmail();

  const handleSubmit = async () => {
    try {
      if (!email) {
        setError("Email is required");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Enter a valid email");
        return;
      }
      await forgotPassword({ email })
      setError("");
      setSent(true);
    } catch (error: any) {
      toast.error(error)
    }
  };

  if (sent) {
    return (
      <AuthLayout title="Reset link sent 📨">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 bg-violet-635FC7/10 rounded-full flex items-center justify-center text-3xl">
            ✉️
          </div>
          <div>
            <p className="text-[13px] leading-[23px] text-gray-828FA3">
              We sent password reset instructions to{" "}
              <span className="text-violet-635FC7 font-bold">{email}</span>.
            </p>
            <p className="text-[13px] text-gray-828FA3 mt-2">
              The link expires in 2 hours. Check your spam folder if you don&apos;t see it.
            </p>
          </div>
          <button
            onClick={() => { setSent(false); setEmail(""); }}
            className="text-xs text-gray-828FA3 hover:text-violet-635FC7 duration-200"
          >
            Try a different email
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="No worries. Enter your email and we'll send you a reset link."
      footerText="Remember your password?"
      footerLinkText="Back to login"
      footerLinkHref="/login"
    >
      <div className="flex flex-col gap-5">
        <Input
          id="email"
          label="Email address"
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); setError(""); }}
          placeholder="you@example.com"
          error={error}
        />

        <Button onClick={handleSubmit} isLoading={isPending}>
          Send reset link
        </Button>
      </div>
    </AuthLayout>
  );
}
