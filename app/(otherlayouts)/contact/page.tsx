import ContactForm from "@/app/components/contact/ContactForm";
import ContactMap from "@/app/components/contact/ContactMap";
import { getPageContent } from "@/lib/page-content";
import { Clock, Globe, Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "RUSL | Contact",
};

const contactItems = [
  {
    icon: Phone,
    label: "Call us",
    value: "+88 02222281246",
    href: "tel:+8802222281246",
  },
  {
    icon: MapPin,
    label: "Corporate office",
    value: "3rd Floor, Achhia Manjil, House#383, Road No 28, Dhaka 1205",
    href: "https://maps.app.goo.gl/Me6eCjeTcrvuUoJW8",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@sigma-royal.com",
    href: "mailto:info@sigma-royal.com",
  },
  {
    icon: Globe,
    label: "Website",
    value: "sigma-royal.com",
    href: "https://sigma-royal.com",
  },
];

export default async function ContactPage() {
  const content = await getPageContent("contact");
  const summary =
    content?.introBody ||
    content?.introTitle ||
    "Reach out for consultation, tender queries, technical support, or office directions. We respond with clear next steps.";

  return (
    <div className="site-canvas min-h-screen">
      <section className="px-4 py-10 md:px-6 md:py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div>
            <div className="mb-7 rounded-xl border border-[#d8e4f5] bg-[#f7faff] p-5">
              <div className="text-xs font-extrabold uppercase tracking-[0.12em] text-red-700">
                Direct channels
              </div>
              <p className="mt-2 max-w-3xl text-base font-medium leading-7 text-[var(--brand-muted)]">
                {summary}
              </p>
            </div>

            <div className="grid max-w-4xl gap-5 md:grid-cols-2">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-4"
                >
                  <item.icon className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <span>
                    <span className="block text-sm font-semibold text-[var(--brand-muted)]">{item.label}</span>
                    <span className="mt-1 block text-base font-extrabold leading-6 text-blue-950 transition-colors group-hover:text-red-600">
                      {item.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#d8e4f5] px-4 py-2 text-sm font-bold text-[var(--brand-copy)]">
              <Clock className="h-4 w-4 text-[var(--brand-blue)]" />
              Saturday–Thursday · 9:00 AM–10:00 PM
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <ContactMap />
    </div>
  );
}
