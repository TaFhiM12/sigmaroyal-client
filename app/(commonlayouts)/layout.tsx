import { Footer2 } from "@/components/layouts/footer2";
import  Navbar1  from "@/components/layouts/navbar1";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="fixed top-0 left-0 w-full z-50">
        <Navbar1 />
      </header>

      <main className="">{children}</main>
      <Footer2 />
    </div>
  );
}
