import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store } from "./redux/store";
import { Providers } from "./redux/Providers";

export const metadata: Metadata = {
  title: "Blog",
  description: "About me and my projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  );
}
