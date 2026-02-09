import ContactBusinessHours from "@/app/components/contact/ContactBusinessHours";
import ContactForm from "@/app/components/contact/ContactForm";
import ContactHero from "@/app/components/contact/ContactHero";
import ContactInfo from "@/app/components/contact/ContactInfo";
import ContactMap from "@/app/components/contact/ContactMap";


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <ContactHero />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            <ContactInfo />
            <ContactBusinessHours />
          </div>
          <div className="space-y-12">
            <ContactForm />
            <ContactMap />
          </div>
        </div>
      </div>
    </div>
  );
}