// app/clients/page.tsx

import ClientCTA from "@/app/components/Clients/ClientCTA";
import ClientLogos from "@/app/components/Clients/ClientLogos";
import ClientStats from "@/app/components/Clients/ClientStats";
import ClientTestimonials from "@/app/components/Clients/ClientTestimonials";

export const metadata = {
  title: "RUSL | Client",
};

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <ClientLogos />
      <ClientTestimonials />
      <ClientCTA />
      <ClientStats />
    </div>
  );
}