import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {cn} from "../lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import {ThemeToggle} from "../components/theme-toggle";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "If It Works, I Wrote It",
  description: "Leo's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} font-sans antialiased`,
          "bg-background text-foreground"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <header className="py-6">
              <div className="container max-w-4xl mx-auto px-4 flex justify-between items-center">
                <nav>
                  <ul className="flex gap-6">
                    <li><Link href="/" className="text-sm text-gray-400 hover:text-gray-100">home</Link></li>
                    <li><a href="#projects" className="text-sm text-gray-400 hover:text-gray-100">projects</a></li>
                    <li><Link href="/wynnxp" className="text-sm text-gray-400 hover:text-gray-100">wynnxp</Link></li>
                  </ul>
                </nav>
                <ThemeToggle />
              </div>
            </header>
            
            <main className="flex-grow">
              <div className="container max-w-4xl mx-auto px-4 py-8">
                {children}
              </div>
            </main>
            
            <footer className="py-6 border-t border-gray-100 dark:border-gray-800">
              <div className="container max-w-4xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Leoluca D&apos;Atri
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
