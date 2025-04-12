import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notion",
  description: "Notion is a all-in-one workspace for your notes, tasks, wikis, and databases.",
  icons: {
    icon: [
      { media: "(prefers-color-scheme: dark)", url: "/notion-fev-icon.png", href: "/notion-fev-icon.png" },
      { media: "(prefers-color-scheme: light)", url: "/notion-fev-icon.png", href: "/notion-fev-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
