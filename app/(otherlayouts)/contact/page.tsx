import ContactForm from "@/app/components/contact/ContactForm";
import ContactMap from "@/app/components/contact/ContactMap";
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

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="px-4 py-10 md:px-6 md:py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="pt-2">
            <div className="mb-5 inline-flex rounded-full bg-red-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-red-700 ring-1 ring-red-100">
              Contact Info
            </div>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-normal text-blue-950 md:text-5xl lg:text-6xl">
              Feel free to reach out for project inquiries or support.
            </h1>

            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-slate-600 md:text-lg">
              Reach out to our team for consultation, tender queries, technical support, or office directions. We respond with clear next steps.
            </p>

            <div className="my-8 h-px max-w-3xl bg-slate-200" />

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
                    <span className="block text-sm font-semibold text-slate-400">{item.label}</span>
                    <span className="mt-1 block text-base font-extrabold leading-6 text-blue-950 transition-colors group-hover:text-red-600">
                      {item.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
              <Clock className="h-4 w-4 text-green-600" />
              Closed now · Opens 9 AM Tuesday
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <ContactMap />
    </div>
  );
}
