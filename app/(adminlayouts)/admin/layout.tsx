import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
};

export default function AdminIndexingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
