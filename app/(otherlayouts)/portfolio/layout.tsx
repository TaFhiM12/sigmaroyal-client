import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Portfolio",
  description:
    "View the corporate portfolio of The Royal Utilisation Services, including engineering capabilities, credentials and project experience.",
  alternates: { canonical: "/portfolio" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
