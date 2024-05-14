import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/nav/Navbar";
import { GlobalContextProvider } from "@/context/events.context";
import { AuthContextProvider } from "@/context/auth.context";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";

const nunito = Nunito({
  weight: ["200", "400", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const APP_NAME = "@bcn";
const APP_DEFAULT_TITLE = "atbcn.info";
const APP_TITLE_TEMPLATE = "@bcn";
const APP_DESCRIPTION = "Troba i afegeix esdeveniments culturals de Barcelona";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
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
          <AuthContextProvider>
            <GlobalContextProvider>
              <main className="min-h-screen w-screen">
                <Navbar />
                {children}
                <div className="bottom-0 absolute w-full">
                  <Footer />
                </div>
              </main>
            </GlobalContextProvider>
          </AuthContextProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
