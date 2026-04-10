"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLogin } from "@hooks/useAuth";
import { setCookie } from "@utils/helper";
import { CookiesEnum } from "@constants/enums";
import { Button, Input } from "@components/common";
import AuthLayout from "@components/auth/AuthLayout";

export default function LoginPage() {
    const router = useRouter();
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const { mutateAsync: login, isPending, error: loginError } = useLogin();

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!data.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Enter a valid email";
        if (!data.password) newErrors.password = "Password is required";
        else if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        return newErrors;
    };

    const handleSubmit = async () => {
        try {
            const newErrors = validate();
            if (Object.keys(newErrors).length) {
                setErrors(newErrors);
                return;
            }

            const res: any = await login({ email: data.email, password: data.password });
            const token = res?.token;

            if (token) {
                setCookie(CookiesEnum.AUTH_TOKEN, token);
                router.push("/board");
            }
            setErrors({});
        } catch (error: any) {
            toast.error(error)
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Log in to your Managelly account and pick up where you left off."
            footerText="Don't have an account?"
            footerLinkText="Create one"
            footerLinkHref="/register"
        >
            <div className="flex flex-col gap-5">
                <Input
                    id="email"
                    label="Email address"
                    type="email"
                    value={data.email}
                    onChange={(v) => {
                        setData({ ...data, email: v });
                        setErrors((e) => ({ ...e, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    error={errors.email}
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(v) => {
                        setData({ ...data, password: v });
                        setErrors((e) => ({ ...e, password: undefined }));
                    }}
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

                <Button onClick={handleSubmit} isLoading={isPending}>
                    Log in
                </Button>
            </div>
        </AuthLayout>
    );
}