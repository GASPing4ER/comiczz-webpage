import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Header } from "@/components";
import { FilterProvider } from "@/contexts/FilterContext";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} antialiased`}>
        <FilterProvider>
          <Header />
          {children}
        </FilterProvider>
      </body>
    </html>
  );
}
