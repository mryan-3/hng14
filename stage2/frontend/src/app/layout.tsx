import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});

import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Invoice Management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="font-league-spartan bg-background-light dark:bg-background-dark min-h-full transition-colors duration-300 flex flex-col lg:flex-row">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <Sidebar />
          <main className="flex-1 mt-20 lg:mt-0 lg:ml-[103px] min-h-[calc(100vh-80px)] lg:min-h-screen p-6 md:p-12 lg:p-20">
            <div className="max-w-[730px] mx-auto w-full">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
