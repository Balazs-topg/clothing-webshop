import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";

import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

import InitState from "./InitState";
import "./global.css";
import { GeistSans } from "geist/font/sans";

//* define fonts
export const playfair_Display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair_Display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  //note that we're not awaiting shit
  const authorization = cookieStore.get("authorization");
  const userInfo = cookieStore.get("userInfo");
  if (authorization && userInfo) {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/log/user/${
        JSON.parse(userInfo.value).id
      }`,
      {
        method: "get",
        headers: { authorization: authorization.value },
      },
    );
  }
  //note that we're not awaiting shit
  const guestUserId = cookieStore.get("guestUserId");
  const guestUserAuth = cookieStore.get("guestUserAuth");
  if (guestUserId && guestUserAuth) {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/log/guest-user/${guestUserId.value}`,
      {
        method: "get",
        headers: { guestUserAuth: guestUserAuth.value },
      },
    );
  }

  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${playfair_Display.variable} relative selection:bg-slate-200/50`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <InitState>
            <div className="h-screen overflow-auto bg-black">
              <Navigation />
              {children}
              <Footer />
            </div>
          </InitState>
        </ThemeProvider>
      </body>
    </html>
  );
}
