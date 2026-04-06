"use client";

import { toast } from "sonner";
import { useState } from "react";

import { useRegister } from "@hooks/useAuth";
import { Button, Input } from "@components/common";
import AuthLayout from "@components/auth/AuthLayout";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const { mutateAsync: register, isPending, data: registerResult } = useRegister();

  const set = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "At least 6 characters";
    else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(form.password))
      newErrors.password = "Must contain a letter and a number";
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
      await register({ firstName: form?.firstName, lastName: form.lastName, email: form.email, password: form.password });
    } catch (error: any) {
      toast.error(error)
    }
  };

  if (registerResult) {
    return (
      <AuthLayout title="Check your inbox ✉️">
        <div className="text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-violet-635FC7/10 rounded-full flex items-center justify-center">
            <span className="text-3xl">📬</span>
          </div>
          <div>
            <p className="text-[13px] leading-[23px] text-gray-828FA3">
              We sent a verification link to{" "}
              <span className="text-violet-635FC7 font-bold">{form.email}</span>.
              Click it to activate your account.
            </p>
            <p className="text-[13px] text-gray-828FA3 mt-2">
              The link expires in 6 hours.
            </p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start managing your tasks with clarity. It's free."
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkHref="/login"
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            label="First name"
            value={form.firstName}
            onChange={set("firstName")}
            placeholder="Jane"
          />
          <Input
            id="lastName"
            label="Last name"
            value={form.lastName}
            onChange={set("lastName")}
            placeholder="Doe"
          />
        </div>

        <Input
          id="email"
          label="Email address"
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="you@example.com"
          error={errors.email}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={set("password")}
          placeholder="Min. 6 chars, letter + number"
          error={errors.password}
        />

        <div className="bg-white-F4F7FD dark:bg-black-20212C rounded-lg p-3">
          <p className="text-xs text-gray-828FA3 leading-[20px]">
            By creating an account, you agree to our terms of service.
            We&apos;ll send a verification email before you can log in.
          </p>
        </div>

        <Button onClick={handleSubmit} isLoading={isPending}>
          Create account
        </Button>
      </div>
    </AuthLayout>
  );
}