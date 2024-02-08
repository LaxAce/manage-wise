"use client";

import { ThemeProvider } from "next-themes";

const Providers = ({ children }: { children: React.ReactNode }) => {
    
    return (
        <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            enableColorScheme={false}
        >
            {children}
        </ThemeProvider>
    )
};

export default Providers;
