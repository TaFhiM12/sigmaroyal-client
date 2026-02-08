"use client";

import React, { useEffect, useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "https://sigma-royal.com/images/logo-1.png",
    alt: "Sigma Construction Company",
    title: "Sigma Construction",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "About",
      url: "#",
      items: [
        { title: "About Us", url: "/about" },
        { title: "Our Team", url: "/team" },
        { title: "Mission & Vision", url: "/mission-vision" },
        { title: "Why Choose Us", url: "/why-choose-us" },
      ],
    },
    {
      title: "Expertise",
      url: "#",
      items: [
        {
          title: "Oil & Gas",
          url: "/expertise/oil-gas",
          description: "Pipeline construction, HDD, LPG solutions",
        },
        {
          title: "Power Plant",
          url: "/expertise/power",
          description: "BOP installation, fabrication, construction",
        },
        {
          title: "Process Plant",
          url: "/expertise/process",
          description: "Refineries, petrochemicals",
        },
        {
          title: "Engineering Services",
          url: "/expertise/engineering",
          description: "Complete LPG solutions, equipment",
        },
      ],
    },
    { title: "Certificates", url: "/certificates" },
    {
      title: "Projects",
      url: "#",
      items: [
        { title: "All Projects", url: "/projects" },
        { title: "Oil & Gas Projects", url: "/projects/oil-gas" },
        { title: "Power Plant Projects", url: "/projects/power" },
        { title: "Completed Projects", url: "/projects/completed" },
        { title: "Ongoing Projects", url: "/projects/ongoing" },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        { title: "Media Gallery", url: "/media" },
        { title: "Portfolio", url: "/portfolio" },
        { title: "Certifications", url: "/certifications" },
        { title: "QHSE Policy", url: "/qhse-policy" },
        { title: "Notices", url: "/notices" },
      ],
    },
    {
      title: "Clients",
      url: "#",
      items: [
        { title: "Our Clients", url: "/clients" },
        { title: "Testimonials", url: "/testimonials" },
        { title: "Case Studies", url: "/case-studies" },
      ],
    },
    {
      title: "Team",
      url: "#",
      items: [
        { title: "Core Management", url: "/team/core-management" },
        { title: "HR & Admin", url: "/team/hr-admin" },
        { title: "Accounts & Finance", url: "/team/accounts-finance" },
        { title: "All Engineers", url: "/team/engineers" },
        { title: "All Officers", url: "/team/officers" },
        { title: "All Members", url: "/team/members" },
      ],
    },
    {
  title: "HYTORC",
  url: "#",
  items: [
    { title: "About Royal-ABS", url: "/hytorc/about" },
    { title: "Hydraulic", url: "/hytorc/hydraulic" },
    { title: "Pneumatic Torque Wrench", url: "/hytorc/pneumatic-torque-wrench" },
    { title: "Electric Torque Wrench", url: "/hytorc/electric-torque-wrench" },
    { title: "Pumps", url: "/hytorc/pumps" },
    { title: "Fasteners", url: "/hytorc/fasteners" },
    { title: "Accessories", url: "/hytorc/accessories" },
  ]
},


    { title: "Contact", url: "/contact" },
  ],
  className,
}: Navbar1Props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColorClass = scrolled ? "text-gray-800" : "text-white";
  const hoverTextColorClass = "hover:text-red-600";

  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <NavigationMenuItem key={item.title}>
          <NavigationMenuTrigger
            className={cn(
              "bg-transparent hover:bg-transparent px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1",
              textColorClass,
              hoverTextColorClass,
              "data-[state=open]:text-red-600",
            )}
          >
            {item.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white text-gray-800 shadow-xl border rounded-lg p-4 min-w-70">
            <div className="grid gap-2">
              {item.items.map((subItem) => (
                <NavigationMenuLink asChild key={subItem.title}>
                  <a
                    className="flex flex-col rounded-md p-3 leading-none no-underline transition-all duration-200 outline-none select-none hover:bg-red-50 hover:text-red-700 focus:bg-transparent text-gray-800 border-l-2 border-transparent hover:border-red-600"
                    href={subItem.url}
                  >
                    <div className="text-sm font-semibold mb-1">
                      {subItem.title}
                    </div>
                    {subItem.description && (
                      <p className="text-xs leading-snug text-gray-600">
                        {subItem.description}
                      </p>
                    )}
                  </a>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink
          href={item.url}
          className={cn(
            "group inline-flex h-10 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-transparent focus:bg-transparent",
            textColorClass,
            hoverTextColorClass,
            "focus:text-red-600 data-[active=true]:text-red-600 data-[active=true]:bg-transparent",
          )}
        >
          {item.title}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <AccordionItem
          key={item.title}
          value={item.title}
          className="border-b border-gray-100 last:border-b-0"
        >
          <AccordionTrigger
            className={cn(
              "text-sm py-4 font-semibold hover:no-underline transition-colors duration-200",
              "text-gray-800",
              hoverTextColorClass,
            )}
          >
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="mt-1">
            <div className="flex flex-col gap-2 pl-4">
              {item.items.map((subItem) => (
                <a
                  key={subItem.title}
                  href={subItem.url}
                  className="flex flex-col rounded-md p-3 leading-none no-underline transition-colors duration-200 outline-none select-none hover:bg-red-50 hover:text-red-700 text-gray-800"
                >
                  <div className="text-sm font-medium">{subItem.title}</div>
                  {subItem.description && (
                    <p className="text-xs text-gray-600 mt-1">
                      {subItem.description}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <a
        key={item.title}
        href={item.url}
        className={cn(
          "text-sm font-semibold transition-colors duration-200 py-4 border-b border-gray-100 last:border-b-0",
          "text-gray-800",
          hoverTextColorClass,
        )}
      >
        {item.title}
      </a>
    );
  };

  return (
    <section
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-0 md:py-6",
        scrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-4",
        className,
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo */}
          <a
            href={logo.url}
            className={cn(
              "flex items-center gap-2 transition-colors duration-200",
              textColorClass,
              hoverTextColorClass,
            )}
          >
            <Image
              width={80}
              height={40}
              src={logo.src}
              className="h-10 w-auto"
              alt={logo.alt}
            />
            <span
              className={cn(
                "text-xl font-bold tracking-tight transition-colors duration-200",
                textColorClass,
                hoverTextColorClass,
              )}
            >
              {logo.title}
            </span>
          </a>

          <div className="flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href={logo.url}
              className={cn(
                "flex items-center gap-2 transition-colors duration-200",
                textColorClass,
                hoverTextColorClass,
              )}
            >
              <Image
                width={60}
                height={30}
                src={logo.src}
                className="h-8 w-auto"
                alt={logo.alt}
              />
              <span className="text-sm font-bold">{logo.title}</span>
            </a>

            <div className="flex items-center gap-4">
              {/* Mobile Contact Button */}
              <a
                href="/contact"
                className={cn(
                  "px-4 py-2 text-xs font-medium transition-all duration-300 rounded-md",
                  scrolled
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 border border-white/30",
                )}
              >
                Contact
              </a>

              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className={cn(
                      "p-2 transition-colors duration-200 rounded-md",
                      textColorClass,
                      hoverTextColorClass,
                    )}
                  >
                    <Menu className="size-5" />
                  </button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto w-full sm:max-w-md p-0">
                  <SheetHeader className="p-6 border-b border-gray-100">
                    <SheetTitle>
                      <a
                        href={logo.url}
                        className={cn(
                          "flex items-center gap-2 transition-colors duration-200",
                          "text-gray-900",
                          hoverTextColorClass,
                        )}
                      >
                        <Image
                          width={60}
                          height={30}
                          src={logo.src}
                          className="h-8 w-auto"
                          alt={logo.alt}
                        />
                        <span className="text-gray-900 font-bold">
                          {logo.title}
                        </span>
                      </a>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col p-6">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    {/* Additional Mobile Links */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-4">
                        <a
                          href="/hytorc"
                          className="text-sm font-medium text-gray-800 hover:text-red-600 transition-colors duration-200 text-center py-3 bg-gray-50 rounded-md"
                        >
                          HYTORC
                        </a>
                        <a
                          href="/certifications"
                          className="text-sm font-medium text-gray-800 hover:text-red-600 transition-colors duration-200 text-center py-3 bg-gray-50 rounded-md"
                        >
                          Certifications
                        </a>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar1;
