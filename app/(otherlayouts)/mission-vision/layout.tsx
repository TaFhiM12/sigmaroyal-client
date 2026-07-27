import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission and Vision",
  description:
    "Read the mission, vision and values guiding The Royal Utilisation Services in engineering, energy and infrastructure delivery.",
  alternates: { canonical: "/mission-vision" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
