"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Suspense, useState } from "react";

import { useResetPassword } from "@hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { Button, Input } from "@components/common";
import AuthLayout from "@components/auth/AuthLayout";
import { getPasswordStrengthIndicator } from "@utils/helper";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const uniqueId = searchParams.get("uniqueId") ?? "";
  const [data, setData] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const { mutateAsync: resetPassword, isPending, data: resetResult } = useResetPassword();

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 6) newErrors.password = "At least 6 characters";
    if (!data.confirm) newErrors.confirm = "Please confirm your password";
    else if (data.confirm !== data.password) newErrors.confirm = "Passwords don't match";
    return newErrors;
  };

  const handleSubmit = async () => {
    try {
      const newErrors = validate();
      if (Object.keys(newErrors).length) {
        setErrors(newErrors);
        return;
      }
      setErrors({});

      await resetPassword({ id, uniqueId, password: data.password });
    } catch (error: any) {
      toast.error(error);
    }
  };

  const strength = getPasswordStrengthIndicator(data.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very strong"][strength];
  const strengthColor = ["", "#EA5555", "#F5A623", "#F5A623", "#67E2AE", "#635FC7"][strength];

  if (resetResult) {
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
            value={data.password}
            onChange={(v) => {
              setData({ ...data, password: v });
              setErrors((e) => ({ ...e, password: undefined }));
            }}
            placeholder="Enter new password"
            error={errors.password}
          />

          {/* Strength bar */}
          {data.password.length > 0 && (
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
          value={data.confirm}
          onChange={(v) => {
            setData({ ...data, confirm: v });
            setErrors((e) => ({ ...e, confirm: undefined }));
          }}
          placeholder="Repeat your password"
          error={errors.confirm}
        />

        <Button onClick={handleSubmit} isLoading={isPending}>
          Update password
        </Button>
      </div>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthLayout title="Loading…">
        <div className="flex justify-center py-8">
          <svg className="animate-spin w-8 h-8 text-violet-635FC7" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </AuthLayout>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
