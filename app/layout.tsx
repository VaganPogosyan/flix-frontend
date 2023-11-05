import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flix",
  description: "Flix Streaming service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log(inter);
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
