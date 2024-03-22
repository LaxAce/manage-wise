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
}: ButtonProps
) => {
    const { resolvedTheme } = useTheme();
    const [hover, setHover] = useState(false);
    const [mounted, setMounted] = useState(false);
    const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const styles = useMemo(() => ({
        ...(isDisabled ? { opacity: "0.25", cursor: "not-allowed" } : {}),

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
            onClick={() => onClick ? onClick() : {}}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`flex justify-center items-center rounded-3xl px-6 text-[15px] font-bold leading-normal text-white-FFFFFF ${className}`}
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
}

export default Button;
