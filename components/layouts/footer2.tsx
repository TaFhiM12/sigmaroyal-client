"use client";

import { cn } from "@/lib/utils";
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
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
  copyright = `© ${new Date().getFullYear()} The Royal Utilisation Services (Pvt.) Ltd & Sigma Construction Company. All rights reserved.`,
  bottomLinks = [
    { text: "Terms and Conditions", url: "/terms" },
    { text: "Privacy Policy", url: "/privacy" },
    { text: "Sitemap", url: "/sitemap" },
  ],
}: Footer2Props) => {
  return (
    <footer className={cn("bg-gray-900 text-white", className)}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Company Info & Contact */}
          <div className="space-y-8">
            {/* Logo & Tagline */}
            <div className="space-y-4">
              <Link href={logo.url} className="inline-block">
                <div className="flex items-center gap-3">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={60}
                    height={60}
                    className="h-12 w-auto"
                  />
                  <span className="text-2xl font-bold">{logo.title}</span>
                </div>
              </Link>
              <p className="text-lg text-gray-300">
                Pioneers in energy sector with 46+ years of excellence in Oil, Gas & Power infrastructure development.
              </p>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Head Office */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-400">Head Office</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-red-400 mt-0.5" />
                    <p>28/A, Nayapaltan (4th Floor) VIP Road, Dhaka-1000, Bangladesh.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-red-400" />
                    <a href="tel:+8802222229238" className="hover:text-red-400 transition-colors">
                      +88 02222229238
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-red-400" />
                    <a href="mailto:info@sigma-royal.com" className="hover:text-red-400 transition-colors">
                      info@sigma-royal.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Office */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-400">Business Office</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-red-400 mt-0.5" />
                    <p>House#383, (3rd floor), Road#28, New DOHS, Mohakhali, Dhaka-1206.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-red-400" />
                    <a href="tel:+8802222281246" className="hover:text-red-400 transition-colors">
                      +88 02222281246
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-red-400" />
                    <span>0258810750</span>
                  </div>
                </div>
              </div>

              {/* Sirajgonj Office */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-semibold text-red-400">Sirajgonj Office</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-red-400 mt-0.5" />
                    <p>Wasim Villa, Masumpur, Sirajgonj.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-red-400" />
                    <a href="tel:+8802588831606" className="hover:text-red-400 transition-colors">
                      +88 02588831606
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-red-400" />
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
              <h3 className="text-lg font-semibold text-red-400">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" aria-label="Facebook" className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Twitter" className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="mailto:info@sigma-royal.com" aria-label="Email" className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Sections */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-red-400 border-b border-gray-700 pb-2">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.url}
                        className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-2 h-2 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.text}
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
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-400 md:text-left">
              {copyright}
            </p>
            
            <div className="flex items-center gap-6">
              <ul className="flex flex-wrap items-center gap-4 text-sm">
                {bottomLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.url}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Back to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
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
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>ISO Certified • Member of Bangladesh Energy Society • Registered with Petrobangla</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer2 };