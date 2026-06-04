"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  text: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface Footer2Props {
  logo?: {
    src: string;
    alt: string;
    title: string;
    url: string;
  };
  className?: string;
  menuItems?: FooterSection[];
  copyright?: string;
  bottomLinks?: FooterLink[];
}

const CURRENT_YEAR = 2026;

const Footer2 = ({
  logo = {
    src: "https://sigma-royal.com/images/logo-1.png",
    alt: "The Royal Utilisation Services (Pvt.) Ltd",
    title: "The Royal Utilisation Services (Pvt.) Ltd",
    url: "/",
  },
  className,
  menuItems = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", url: "/" },
        { text: "About Us", url: "/about" },
        { text: "Our Projects", url: "/projects" },
        { text: "Our Expertise", url: "/expertise" },
        { text: "Our Clients", url: "/clients" },
        { text: "Contact Us", url: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { text: "Oil & Gas Pipeline", url: "/services/oil-gas" },
        { text: "Power Plant Construction", url: "/services/power" },
        { text: "Process Plants", url: "/services/process" },
        { text: "LPG Solutions", url: "/services/lpg" },
        { text: "HDD River Crossing", url: "/services/hdd" },
        { text: "Engineering Services", url: "/services/engineering" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Certifications", url: "/certifications" },
        { text: "Portfolio", url: "/portfolio" },
        { text: "Media Gallery", url: "/media" },
        { text: "QHSE Policy", url: "/qhse-policy" },
        { text: "Careers", url: "/careers" },
        { text: "Downloads", url: "/downloads" },
      ],
    },
  ],
  copyright = `© ${CURRENT_YEAR} The Royal Utilisation Services (Pvt.) Ltd & Sigma Construction Company. All rights reserved.`,
  bottomLinks = [
    { text: "Terms and Conditions", url: "/terms" },
    { text: "Privacy Policy", url: "/privacy" },
    { text: "Sitemap", url: "/sitemap" },
  ],
}: Footer2Props) => {
  return (
    <footer className={cn("relative overflow-hidden bg-blue-950 text-white", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(200,30,43,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-300/40 to-transparent" />
      {/* Main Footer Content */}
      <div className="container relative mx-auto px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr]">
          {/* Company Info & Contact */}
          <div className="space-y-8">
            {/* Logo & Tagline */}
            <div className="space-y-4">
              <Link href={logo.url} className="inline-block">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/8 ring-1 ring-white/12">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={60}
                      height={60}
                      className="h-11 w-auto"
                    />
                  </span>
                  <span className="max-w-md text-lg font-extrabold leading-tight text-white md:text-2xl">{logo.title}</span>
                </div>
              </Link>
              <p className="max-w-xl text-sm leading-7 text-blue-50/85 md:text-base">
                Pioneers in energy sector with 46+ years of excellence  in Oil, <br /> Gas & Power infrastructure development.
              </p>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Head Office */}
              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5 shadow-lg shadow-blue-950/10 backdrop-blur-sm">
                <h3 className="mb-4 text-base font-extrabold text-blue-100">Head Office</h3>
                <div className="space-y-3 text-sm leading-6 text-blue-50/90 [&_a]:text-blue-50 [&_p]:text-blue-50 [&_span]:text-blue-50">
                  <div className="flex items-start gap-3 ">
                    <MapPin className="mt-1 h-[18px] w-[18px] shrink-0 text-red-400" />
                    <p>28/A, Nayapaltan (4th Floor) VIP Road, Dhaka-1000, Bangladesh.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-[18px] w-[18px] shrink-0 text-red-400" />
                    <a href="tel:+8802222229238" className="hover:text-red-400 transition-colors">
                      +88 02222229238
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-[18px] w-[18px] shrink-0 text-red-400" />
                    <a href="mailto:info@sigma-royal.com" className="hover:text-red-400 transition-colors">
                      info@sigma-royal.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Office */}
              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5 shadow-lg shadow-blue-950/10 backdrop-blur-sm">
                <h3 className="mb-4 text-base font-extrabold text-blue-100">Business Office</h3>
                <div className="space-y-3 text-sm leading-6 text-blue-50/90 [&_a]:text-blue-50 [&_p]:text-blue-50 [&_span]:text-blue-50">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-[18px] w-[18px] flex-shrink-0 text-red-400" />
                    <p>House#383, (3rd floor), Road#28, New DOHS, Mohakhali, Dhaka-1206.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-[18px] w-[18px] flex-shrink-0 text-red-400" />
                    <a href="tel:+8802222281246" className="hover:text-red-400 transition-colors">
                      +88 02222281246
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-[18px] w-[18px] flex-shrink-0 text-red-400" />
                    <span>0258810750</span>
                  </div>
                </div>
              </div>

              {/* Sirajgonj Office */}
              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5 shadow-lg shadow-blue-950/10 backdrop-blur-sm md:col-span-2">
                <h3 className="mb-4 text-base font-extrabold text-blue-100">Sirajgonj Office</h3>
                <div className="grid gap-3 text-sm leading-6 text-blue-50/90 md:grid-cols-3 [&_a]:text-blue-50 [&_p]:text-blue-50 [&_span]:text-blue-50">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-[18px] w-[18px] flex-shrink-0 text-red-400" />
                    <p>Wasim Villa, Masumpur, Sirajgonj.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-[18px] w-[18px] flex-shrink-0 text-red-400" />
                    <a href="tel:+8802588831606" className="hover:text-red-400 transition-colors">
                      +88 02588831606
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-[18px] w-[18px] flex-shrink-0 text-red-400" />
                    <a href="https://www.sigma-royal.com" target="_blank" rel="noopener noreferrer" 
                       className="hover:text-red-400 transition-colors">
                      www.sigma-royal.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-blue-100">Connect With Us</h3>
              <div className="flex gap-3">
                <a href="#" aria-label="Facebook" className="rounded-lg bg-white/8 p-2.5 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-red-600 hover:ring-red-500/40">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="rounded-lg bg-white/8 p-2.5 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-red-600 hover:ring-red-500/40">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Twitter" className="rounded-lg bg-white/8 p-2.5 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-red-600 hover:ring-red-500/40">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="mailto:info@sigma-royal.com" aria-label="Email" className="rounded-lg bg-white/8 p-2.5 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-red-600 hover:ring-red-500/40">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Sections */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((section, index) => (
              <div key={index} className="rounded-xl border border-white/10 bg-white/[0.035] p-5 shadow-lg shadow-blue-950/10 backdrop-blur-sm">
                <h3 className="border-b border-white/10 pb-3 text-base font-extrabold text-blue-100">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.url}
                        className="group flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm text-blue-50/78 transition-all duration-200 hover:bg-white/7 hover:text-white"
                      >
                        <span>{link.text}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-blue-200/35 transition-colors group-hover:text-red-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-blue-900/70 bg-slate-950">
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-slate-400 md:text-left">
              {copyright}
            </p>
            
            <div className="flex items-center gap-6">
              <ul className="flex flex-wrap items-center gap-4 text-sm">
                {bottomLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.url}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Back to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hidden md:flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
                aria-label="Back to top"
              >
                Back to Top
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Accreditation Note */}
          <div className="mt-4 text-center text-xs text-slate-600">
            <p>ISO Certified • Member of Bangladesh Energy Society • Registered with Petrobangla</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer2 };
