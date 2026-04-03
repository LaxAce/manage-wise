"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, Input } from "@components/common";
import AuthLayout from "@components/auth/AuthLayout";

export default function ResetPasswordPage() {
  // In production: id and unique_id come from URL params /reset-password/[id]/[unique_id]
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "At least 6 characters";
    if (!confirm) newErrors.confirm = "Please confirm your password";
    else if (confirm !== password) newErrors.confirm = "Passwords don't match";
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
    // API integration: POST /verify_forgot_password { id, unique_id, password }
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  // Password strength indicator
  const getStrength = (pw: string) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very strong"][strength];
  const strengthColor = ["", "#EA5555", "#F5A623", "#F5A623", "#67E2AE", "#635FC7"][strength];

  if (success) {
    return (
      <AuthLayout title="Password updated! 🎉">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-3xl">
            ✅
          </div>
          <p className="text-[13px] leading-[23px] text-gray-828FA3">
            Your password has been reset successfully. You can now log in with your new password.
          </p>
          <Link
            href="/login"
            className="w-full h-12 rounded-full font-bold text-[15px] bg-violet-635FC7 hover:bg-violet-A8A4FF text-white flex items-center justify-center duration-200"
          >
            Log in now →
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create new password"
      subtitle="Choose a strong password for your account. Minimum 6 characters."
    >
      <div className="flex flex-col gap-5">
        <div>
          <Input
            id="password"
            label="New password"
            type="password"
            value={password}
            onChange={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: undefined })); }}
            placeholder="Enter new password"
            error={errors.password}
          />

          {/* Strength bar */}
          {password.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: i <= strength ? strengthColor : "#E4EBFA",
                    }}
                  />
                ))}
              </div>
              <p className="text-xs font-medium" style={{ color: strengthColor }}>
                {strengthLabel}
              </p>
            </div>
          )}
        </div>

        <Input
          id="confirm"
          label="Confirm new password"
          type="password"
          value={confirm}
          onChange={(v) => { setConfirm(v); setErrors((e) => ({ ...e, confirm: undefined })); }}
          placeholder="Repeat your password"
          error={errors.confirm}
        />

        <Button onClick={handleSubmit} isLoading={isLoading}>
          Update password
        </Button>
      </div>
    </AuthLayout>
  );
}
