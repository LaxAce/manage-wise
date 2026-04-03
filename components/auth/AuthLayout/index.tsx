"use client";

import Link from "next/link";

import { Logo, ThemeSwitcher } from "@components/common";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    footerText?: string;
    footerLinkText?: string;
    footerLinkHref?: string;
}

export default function AuthLayout({
    children,
    title,
    subtitle,
    footerText,
    footerLinkText,
    footerLinkHref,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-white-F4F7FD dark:bg-black-20212C duration-500 flex flex-col items-center justify-center px-4 py-12 relative">

            {/* Background blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-635FC7/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-A8A4FF/5 rounded-full blur-[130px]" />
                <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-violet-635FC7/5 rounded-full blur-[100px]" />
            </div>

            {/* Theme toggle — top right */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeSwitcher />
            </div>

            {/* Logo */}
            <div className="mb-8">
                <Logo />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-[480px] bg-white-FFFFFF dark:bg-gray-2B2C37 rounded-2xl border border-gray-E4EBFA dark:border-gray-3E3F4E shadow-xl px-8 py-10">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold dark:text-white-FFFFFF text-black-000112 mb-2 leading-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-[13px] leading-[23px] font-medium text-gray-828FA3">
                            {subtitle}
                        </p>
                    )}
                </div>

                {children}

                {footerText && footerLinkText && footerLinkHref && (
                    <p className="mt-6 text-center text-[13px] font-medium text-gray-828FA3">
                        {footerText}{" "}
                        <Link
                            href={footerLinkHref}
                            className="text-violet-635FC7 font-bold hover:text-violet-A8A4FF duration-200"
                        >
                            {footerLinkText}
                        </Link>
                    </p>
                )}
            </div>

            {/* Back to home link */}
            <Link
                href="/"
                className="relative z-10 mt-6 text-xs text-gray-828FA3 hover:text-violet-635FC7 duration-200 flex items-center gap-1"
            >
                ← Back to home
            </Link>
        </div>
    );
}