"use client";

import { ThemeProvider } from "@/components/providers/them-provider";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";

const MainLayout = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, isLoading } = useConvexAuth();
    if (isLoading) {
        return <div className="h-full flex items-center justify-center">
            <Spinner size={"lg"} />
        </div>
    }

    if (!isAuthenticated) {
        return (
            redirect("/")
        );
    }

    return (

        <ThemeProvider attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="notion-theme"
      >
        <div className="h-full flex dark:bg-[#1f1f1f]">
            <Navigation />
            <main className="flex-1 overflow-y-auto h-full">
                <SearchCommand />
                {children}
            </main>
        </div>
        </ThemeProvider>
        );
}

export default MainLayout;