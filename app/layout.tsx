import type { Metadata } from "next";
import { Inter, Andada_Pro, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const andada = Andada_Pro({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-button",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RUSL",
  description: "The Royal Utilisation Services (Pvt.) Ltd",
  icons: {
    icon: "/logo.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${inter.variable} ${andada.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
