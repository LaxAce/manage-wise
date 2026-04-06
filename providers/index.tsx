"use client";

import { ThemeProvider } from "next-themes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                enableSystem
                attribute="class"
                defaultTheme="system"
                enableColorScheme={false}
            >
                {children}
            </ThemeProvider>
        </QueryClientProvider>

    )
};

export default Providers;
