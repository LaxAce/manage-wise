"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, Input } from "@components/common";
import AuthLayout from "@components/auth/AuthLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    // API integration goes here
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your Manage Wise account and pick up where you left off."
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLinkHref="/register"
    >
      <div className="flex flex-col gap-5">
        <Input
          id="email"
          label="Email address"
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: undefined })); }}
          placeholder="you@example.com"
          error={errors.email}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: undefined })); }}
          placeholder="Enter your password"
          error={errors.password}
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-violet-635FC7 hover:text-violet-A8A4FF font-medium duration-200"
          >
            Forgot password?
          </Link>
        </div>

        <Button onClick={handleSubmit} isLoading={isLoading}>
          Log in
        </Button>
      </div>
    </AuthLayout>
  );
}