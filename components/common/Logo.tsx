"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

import { KBDarkThemeLogo, KanbanLogo } from "@icons";

const Logo = () => {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const isDarkTheme = useMemo(() => Boolean(theme === "dark"), [theme]);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    // console.log('xxxxxx mounted', mounted )
    return (
        <>
            {isDarkTheme ? (<KBDarkThemeLogo />) : (<KanbanLogo />)}
        </>
    );
}

export default Logo;