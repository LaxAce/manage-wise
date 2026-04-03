"use client"

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

interface ButtonProps {
    width?: string;
    height?: string;
    hover?: boolean;
    className?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    size?: "large" | "small" | "extraSmall" | "full";
    variant?: "primary" | "secondary" | "destructive" | "neutral";
}

const Spinner = () => (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
);

const Button = ({
    width,
    height,
    onClick,
    children,
    isLoading,
    className,
    isDisabled,
    size = "small",
    variant = "primary",
}: ButtonProps) => {
    const { resolvedTheme } = useTheme();
    const [hover, setHover] = useState(false);
    const [mounted, setMounted] = useState(false);
    const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const styles = useMemo(() => ({
        ...(isDisabled || isLoading ? { opacity: "0.5", cursor: "not-allowed" } : {}),

        ...(size === "full" ? { width: "100%" } : {}),
        ...(size === "large" ? { height: "48px" } : {}),
        ...(size === "small" ? { height: "40px", fontSize: "13px", lineHeight: "23px" } : {}),
        ...(size === "extraSmall" ? { height: "32px", fontSize: "13px", lineHeight: "23px", paddingLeft: "10px", paddingRight: "10px" } : {}),

        ...(variant === "primary" ? { backgroundColor: (hover && !isDisabled && !isLoading) ? "#A8A4FF" : "#635FC7" } : {}),
        ...(variant === "destructive" ? { backgroundColor: (hover && !isDisabled && !isLoading) ? "#FF9898" : "#EA5555" } : {}),
        ...(variant === "secondary" ? { backgroundColor: isDark ? "#fff" : (hover && !isDisabled && !isLoading) ? "#E4EBFA" : "rgba(99, 95, 199, 0.10)", color: "#635FC7" } : {}),
        ...(variant === "neutral" ? { backgroundColor: "inherit", color: "inherit", height: "inherit", padding: "unset", lineHeight: "unset", fontSize: "inherit" } : {}),

        ...(width ? { width: width } : {}),
        ...(height ? { height: height } : {}),
    }), [isDark, hover, isDisabled, isLoading, size, variant, width, height]);

    if (!mounted) {
        return null;
    };

    return (
        <button
            style={styles}
            disabled={isDisabled || isLoading}
            onClick={() => (!isDisabled && !isLoading && onClick) ? onClick() : {}}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`flex justify-center items-center gap-2 rounded-3xl px-6 text-[15px] font-bold leading-normal text-white-FFFFFF ${className}`}
        >
            {isLoading ? (
                <>
                    <Spinner />
                    <span>Loading...</span>
                </>
            ) : children}
        </button>
    );
}

export default Button;
