"use client"

import { useTheme } from "next-themes";
import { HiSun } from "react-icons/hi";
import { IoMdMoon } from "react-icons/io";
import { useEffect, useState } from "react";

import { RadioInput } from "@components/common";
import { ThemeSwitcherProps } from "@components/common/types";


const ThemeSwitcher = ({ isBig }: ThemeSwitcherProps) => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        <div className={`${isBig ? "py-2.5 rounded-lg" : "py-2 rounded"} w-[251px] flex justify-center items-center gap-5 dark:bg-black-20212C bg-white-F4F7FD duration-300`}>
            <HiSun size={isBig ? "24px" : "20px"} fill="#828FA3" />
            <RadioInput isBig={isBig} value={resolvedTheme === "dark" ? true : false} onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} />
            <IoMdMoon size={isBig ? "22px" : "18px"} fill="#828FA3" />
        </div>
    );
}

export default ThemeSwitcher;
