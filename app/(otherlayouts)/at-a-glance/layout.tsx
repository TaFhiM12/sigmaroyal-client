import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company at a Glance",
  description:
    "Discover the history, milestones, capabilities and key facts of The Royal Utilisation Services, serving Bangladesh since 1977.",
  alternates: { canonical: "/at-a-glance" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
