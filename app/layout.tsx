import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sigma-royal.com";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Royal Utilisation Services (Pvt.) Ltd",
    template: "%s | The Royal Utilisation Services",
  },
  description:
    "The Royal Utilisation Services (Pvt.) Ltd delivers oil, gas, power, pipeline, LPG, HYTORC, fabrication and energy infrastructure solutions in Bangladesh.",
  keywords: [
    "Royal Utilisation Services",
    "Sigma Royal",
    "oil and gas Bangladesh",
    "pipeline construction",
    "power infrastructure",
    "HYTORC Bangladesh",
  ],
  applicationName: "The Royal Utilisation Services",
  authors: [{ name: "The Royal Utilisation Services (Pvt.) Ltd" }],
  creator: "The Royal Utilisation Services (Pvt.) Ltd",
  publisher: "The Royal Utilisation Services (Pvt.) Ltd",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "The Royal Utilisation Services",
    title: "The Royal Utilisation Services (Pvt.) Ltd",
    description:
      "Oil, gas, power, pipeline, LPG and industrial infrastructure solutions backed by decades of engineering experience.",
    images: [
      {
        url: "/banner/banner1.jpeg",
        width: 1200,
        height: 630,
        alt: "The Royal Utilisation Services industrial energy infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Royal Utilisation Services (Pvt.) Ltd",
    description:
      "Oil, gas, power, pipeline, LPG and industrial infrastructure solutions in Bangladesh.",
    images: ["/banner/banner1.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
