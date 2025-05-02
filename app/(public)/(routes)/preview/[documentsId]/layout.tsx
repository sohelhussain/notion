import { ThemeProvider } from "@/components/providers/them-provider";

export default function PublicLayout ({children}:{children:React.ReactNode}) {
    return (
      <ThemeProvider attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="notion-theme"
    >
        <div className="h-full  dark:bg-[#1F1F1F]">
          {children}
        </div>
    </ThemeProvider>
    )
    }