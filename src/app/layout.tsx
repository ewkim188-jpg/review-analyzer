import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReviewAnalyzer",
  description: "Shopping Review Analysis Chatbot Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
