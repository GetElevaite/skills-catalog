import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Skills Catalog — Claude Skills Library",
  description:
    "Browse and discover ready-to-use skills for Claude — copy prompts or download full packages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0d0d0d] text-white">
        <Navbar />
        <div className="min-h-[calc(100vh-56px)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
