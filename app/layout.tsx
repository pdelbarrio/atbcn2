import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/nav/Navbar";
import { GlobalContextProvider } from "@/context/events.context";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";

const nunito = Nunito({
  weight: ["200", "400", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "@bcn",
  description: "Troba i afegeix esdeveniments culturals de Barcelona",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className} relative min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalContextProvider>
            <main className="min-h-screen w-screen">
              <Navbar />
              {children}
              <div className="bottom-0 absolute w-full">
                <Footer />
              </div>
            </main>
          </GlobalContextProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
