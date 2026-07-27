import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Strength",
  description:
    "Explore the experienced people, equipment, partnerships and certified capabilities behind our industrial project delivery.",
  alternates: { canonical: "/our-strength" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
