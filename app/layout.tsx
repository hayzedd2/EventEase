import type { Metadata } from "next";
import "./globals.css";
import { Newsreader } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import { Analytics } from "@vercel/analytics/react"

const news = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "EventEase",
  description: "Manage and book events easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={`${news.className} bg-[#FAFAFA] antialiased`}>
          {children}
          <Analytics/>
        </body>
      </html>
    </QueryProvider>
  );
}
