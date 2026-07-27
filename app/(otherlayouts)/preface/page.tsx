import PrefaceContent from "@/app/components/preface/PrefaceContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Overview",
  description:
    "Learn about The Royal Utilisation Services, a Bangladesh engineering and construction company serving energy and industrial sectors since 1977.",
  alternates: { canonical: "/preface" },
};

export default function PrefacePage() {
  return (
    <div>
      <PrefaceContent />
    </div>
  )
}
