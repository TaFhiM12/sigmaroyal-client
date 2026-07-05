"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  ArrowUpRight,
  Award,
  Building2,
  ChevronDown,
  FileText,
  FolderKanban,
  Home,
  Mail,
  Menu,
  Phone,
  Sparkles,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navbarLogo, navbarMenu } from "@/app/data/navbar";
import { Navbar1Props } from "@/types/navbar";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  items?: MenuItem[];
}

const Navbar1 = ({
  logo = navbarLogo,
  menu = navbarMenu,
  className,
}: Navbar1Props) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const dropdownCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current);
      if (dropdownOpenTimer.current) clearTimeout(dropdownOpenTimer.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const dropdownElement = dropdownRefs.current[activeDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const isUrlActive = (url: string) => {
    const path = url.split(/[?#]/)[0];
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const toggleDropdown = (menuTitle: string) => {
    if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current);
    if (dropdownOpenTimer.current) clearTimeout(dropdownOpenTimer.current);
    setActiveDropdown(activeDropdown === menuTitle ? null : menuTitle);
  };

  const openDropdown = (menuTitle: string) => {
    if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current);
    if (dropdownOpenTimer.current) clearTimeout(dropdownOpenTimer.current);

    dropdownOpenTimer.current = setTimeout(() => {
      setActiveDropdown(menuTitle);
    }, 90);
  };

  const closeDropdown = () => {
    if (dropdownOpenTimer.current) clearTimeout(dropdownOpenTimer.current);
    if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current);

    dropdownCloseTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 260);
  };

  const handleMobileLinkClick = () => {
    // Close the accordion and sheet when a link is clicked
    setOpenAccordion(null);
    setSheetOpen(false);
  };

  const getMobileIcon = (title: string) => {
    const iconClass = "h-4 w-4";

    switch (title) {
      case "Home":
        return <Home className={iconClass} />;
      case "Company":
        return <Building2 className={iconClass} />;
      case "Expertise":
        return <Wrench className={iconClass} />;
      case "Projects":
        return <FolderKanban className={iconClass} />;
      case "Resources":
        return <FileText className={iconClass} />;
      case "Contact":
        return <Phone className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  const getDropdownIcon = (parentTitle: string, index: number) => {
    const iconClass = "h-4 w-4";
    const icons = {
      Company: [Building2, UsersIcon, Award, ShieldIcon, HistoryIcon],
      Expertise: [Wrench, FolderKanban, Sparkles, Building2, Award, Wrench],
      Projects: [FolderKanban, Sparkles, FileText],
      Resources: [Award, FileText, FolderKanban, ArrowUpRight],
    };
    const Icon =
      icons[parentTitle as keyof typeof icons]?.[index] ||
      [Sparkles, FileText, Building2, Award][index % 4];

    return <Icon className={iconClass} />;
  };

  const getDropdownEyebrow = (title: string) => {
    switch (title) {
      case "Company":
        return "Company";
      case "Expertise":
        return "Capabilities";
      case "Projects":
        return "Delivery";
      case "Resources":
        return "Knowledge & Media";
      default:
        return "Explore";
    }
  };

  const DesktopDropdown = ({ item }: { item: MenuItem }) => {
    if (!item.items) return null;

    return (
      <div 
        ref={(el) => {
          dropdownRefs.current[item.title] = el;
        }}
        className={cn(
          "absolute top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200/90 bg-white/98 shadow-[0_22px_60px_rgba(2,12,32,0.20)] backdrop-blur-xl",
          item.items.length > 4 ? "w-[640px] max-w-[calc(100vw-2rem)]" : "w-[420px] max-w-[calc(100vw-2rem)]",
          "before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-['']",
          "origin-top transition-all duration-200 ease-out",
          item.title === "Resources" || item.title === "Projects" ? "right-0" : "left-0",
          activeDropdown === item.title 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-[0.97] -translate-y-3 pointer-events-none"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(37,99,235,0.10),transparent_32%),radial-gradient(circle_at_92%_8%,rgba(200,30,43,0.08),transparent_30%)]" />
        <div className="relative border-b border-blue-950/8 px-5 py-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-700">
              {getDropdownEyebrow(item.title)}
            </p>
            <h3 className="mt-1 text-base font-extrabold text-(--brand-navy)">
              {item.title}
            </h3>
          </div>
        </div>

        <div className={cn(
          "relative grid gap-1.5 p-2",
          item.items.length > 4 && "grid-cols-2"
        )}>
          {item.items.map((subItem, index) => (
            <Link
              key={subItem.title}
              href={subItem.url}
              className={cn(
                "group grid grid-cols-[36px_1fr_20px] items-start gap-3 rounded-lg border border-transparent px-3 py-3 transition-all duration-200",
                "text-(--brand-navy) hover:border-blue-100 hover:bg-blue-50/85"
              )}
              onClick={() => setActiveDropdown(null)}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950 text-white shadow-sm shadow-blue-950/15 transition-colors duration-200 group-hover:bg-red-600">
                {getDropdownIcon(item.title, index)}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-extrabold leading-tight text-(--brand-navy) transition-colors group-hover:text-blue-950">
                  {subItem.title}
                </span>
                {subItem.description ? (
                  <span className="mt-1.5 block text-xs leading-relaxed text-(--brand-muted)">
                    {subItem.description}
                  </span>
                ) : (
                  <span className="mt-1.5 block text-xs leading-relaxed text-(--brand-muted)">
                    Explore company information and resources
                  </span>
                )}
              </span>
              <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#eef4ff] text-(--brand-muted) transition-all duration-200 group-hover:bg-red-600 group-hover:text-white">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="relative border-t border-blue-950/8 bg-[#f7faff]/80 px-5 py-3">
          <Link
            href={item.url === "#" ? "/contact" : item.url}
            onClick={() => setActiveDropdown(null)}
            className="group flex items-center justify-between rounded-lg text-xs font-extrabold uppercase tracking-widest text-blue-900 transition-colors hover:text-red-600"
          >
            <span>Explore all {item.title.toLowerCase()}</span>
            <span className="flex items-center gap-1">
              Contact team
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>
    );
  };

  const UsersIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21a7 7 0 0 1 14 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 8v6m3-3h-6" />
    </svg>
  );

  const ShieldIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-5" />
    </svg>
  );

  const HistoryIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1 0 3-6.7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4v5h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );

  const renderMenuItem = (item: MenuItem) => {
    const itemIsActive =
      isUrlActive(item.url) ||
      Boolean(item.items?.some((subItem) => isUrlActive(subItem.url))) ||
      (item.title === "Expertise" && pathname.startsWith("/hytorc"));

    if (item.items) {
      return (
        <div
          key={item.title}
          className="relative"
          onMouseEnter={() => openDropdown(item.title)}
          onMouseLeave={closeDropdown}
        >
          <button
            type="button"
            onClick={() => toggleDropdown(item.title)}
            className={cn(
              "group relative flex items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.055em] text-white/72 transition-all duration-200 xl:px-2.5 xl:text-xs 2xl:px-3",
              "hover:bg-white/8 hover:text-red-300",
              itemIsActive && "text-white",
              activeDropdown === item.title && "bg-white text-blue-950 shadow-sm hover:bg-white hover:text-blue-950"
            )}
            aria-current={itemIsActive ? "page" : undefined}
            aria-expanded={activeDropdown === item.title}
          >
            {item.title}
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              activeDropdown === item.title && "rotate-180"
            )} />
            
            <div className={cn(
              "absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-red-500 transition-all duration-300 group-hover:w-4/5",
              (activeDropdown === item.title || itemIsActive) && "w-4/5"
            )} />
          </button>
          
          <DesktopDropdown item={item} />
        </div>
      );
    }

    return (
      <Link
        key={item.title}
        href={item.url}
        className={cn(
          "group relative rounded-lg px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.055em] text-white/72 transition-all duration-200 xl:px-2.5 xl:text-xs 2xl:px-3",
          "hover:bg-white/8 hover:text-red-300",
          itemIsActive && "text-white"
        )}
        aria-current={itemIsActive ? "page" : undefined}
      >
        {item.title}
        <div className={cn(
          "absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-red-500 transition-all duration-300 group-hover:w-4/5",
          itemIsActive ? "w-4/5" : "w-0"
        )} />
      </Link>
    );
  };

  const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <AccordionItem
          key={item.title}
          value={item.title}
          className="border-0"
        >
          <AccordionTrigger
            className={cn(
              "group rounded-lg border border-[#d8e4f5] bg-white px-3.5 py-3 text-left shadow-sm",
              "text-[15px] font-extrabold text-(--brand-navy) hover:no-underline",
              "transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-950",
              "data-[state=open]:border-blue-200 data-[state=open]:bg-blue-50 data-[state=open]:text-blue-950",
            )}
            onClick={() => setOpenAccordion(openAccordion === item.title ? null : item.title)}
          >
            <span className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-950 text-white transition-colors group-hover:bg-blue-800">
                {getMobileIcon(item.title)}
              </span>
              <span>{item.title}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-1 pt-2">
            <div className="grid gap-2 pl-3">
              {item.items.map((subItem) => (
                <Link
                  key={subItem.title}
                  href={subItem.url}
                  onClick={handleMobileLinkClick}
                  className={cn(
                    "group relative rounded-lg border border-[#d8e4f5] bg-white p-3 no-underline shadow-sm outline-none",
                    "transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/70 hover:shadow-md"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-bold leading-tight text-(--brand-navy)">
                      {subItem.title}
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-(--brand-muted) transition-colors group-hover:text-red-600" />
                  </div>
                  {subItem.description && (
                    <p className="mt-1.5 text-xs leading-relaxed text-(--brand-muted)">
                      {subItem.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <Link
        key={item.title}
        href={item.url}
        onClick={handleMobileLinkClick}
        className={cn(
          "group flex items-center justify-between rounded-lg border border-[#d8e4f5] bg-white px-3.5 py-3 text-[15px]",
          "font-extrabold text-(--brand-navy) shadow-sm transition-all duration-200",
          "hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-950 hover:shadow-md",
        )}
      >
        <span className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-950 text-white transition-colors group-hover:bg-blue-800">
            {getMobileIcon(item.title)}
          </span>
          <span>{item.title}</span>
        </span>
        <ArrowUpRight className="h-4 w-4 text-(--brand-muted) transition-colors group-hover:text-red-600" />
      </Link>
    );
  };

  return (
    <section
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-all duration-300 ease-out",
        scrolled ? "py-2" : "py-3",
        className
      )}
    >
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8">
        <nav
          aria-label="Primary navigation"
          className={cn(
            "hidden min-h-[72px] items-center gap-3 overflow-visible rounded-xl border bg-[#0B1E3D]/95 px-3 backdrop-blur-xl transition-all duration-300 lg:flex xl:px-4",
            scrolled
              ? "border-white/10 shadow-[0_14px_38px_rgba(2,9,25,0.24)]"
              : "border-white/12 shadow-[0_18px_50px_rgba(2,9,25,0.20)]",
          )}
        >
          <Link
            href={logo.url}
            className="group flex min-w-[290px] shrink-0 items-center gap-3 rounded-lg px-2 py-2 xl:min-w-[340px]"
            aria-label="The Royal Utilisation Services (Pvt.) Ltd"
          >
            <span className="flex h-12 w-11 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/8">
              <Image
                width={44}
                height={58}
                src="/logo.png"
                className="h-10 w-auto object-contain"
                alt="Royal Utilisation Services logo"
                priority
              />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="whitespace-nowrap text-[13px] font-extrabold leading-tight tracking-[-0.015em] text-white transition-colors group-hover:text-blue-100 xl:text-sm 2xl:text-[15px]">
                The Royal Utilisation Services (Pvt.) Ltd
              </span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-blue-200/55 xl:text-[10px]">
                Sigma Construction Company
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center justify-center gap-0.5 xl:gap-1">
            {menu.map((item) => renderMenuItem(item))}
          </div>

          <Link
            href="/contact"
            className="group ml-2 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-extrabold text-white shadow-[0_8px_22px_rgba(220,38,38,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-red-700 hover:shadow-[0_12px_30px_rgba(220,38,38,0.34)] xl:px-5"
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>

        <div className="lg:hidden">
          <div className="flex items-center justify-between rounded-xl border border-white/12 bg-[#0B1E3D]/95 px-3 py-2.5 shadow-[0_12px_34px_rgba(2,9,25,0.22)] backdrop-blur-xl">
            <Link
              href={logo.url}
              className="flex min-w-0 items-center gap-2.5 text-white"
              aria-label="The Royal Utilisation Services (Pvt.) Ltd"
            >
              <span className="flex h-10 w-9 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/8">
                <Image
                  width={40}
                  height={58}
                  src="/logo.png"
                  className="h-8 w-auto object-contain"
                  alt="Royal Utilisation Services logo"
                />
              </span>
              <span className="flex min-w-0 max-w-[240px] flex-col leading-tight">
                <span className="truncate text-[10px] font-extrabold tracking-[-0.01em] min-[390px]:text-[11px]">
                  The Royal Utilisation Services (Pvt.) Ltd
                </span>
                <span className="mt-1 truncate text-[8px] font-bold uppercase tracking-[0.14em] text-blue-200/55 min-[390px]:text-[9px]">
                  Sigma Construction Company
                </span>
              </span>
            </Link>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  className="rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/10 hover:text-red-400"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="h-dvh w-[92vw] max-w-[430px] gap-0 overflow-hidden border-l border-blue-950/10 bg-[#f7faff] p-0 shadow-2xl"
              >
                <div className="flex h-full flex-col">
                  <SheetHeader className="border-b border-blue-950/10 bg-white p-0">
                    <SheetTitle>
                      <Link
                        href={logo.url}
                        onClick={() => setSheetOpen(false)}
                        className="flex items-center gap-3 px-5 py-5 pr-12 text-left text-(--brand-navy)"
                      >
                        <span className="flex h-12 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-blue-100">
                          <Image
                            width={44}
                            height={58}
                            src="/logo.png"
                            className="h-10 w-auto object-contain"
                            alt="Royal Utilisation Services logo"
                          />
                        </span>
                        <span className="flex min-w-0 flex-col leading-tight">
                          <span className="text-[12px] font-extrabold leading-snug">
                            The Royal Utilisation Services (Pvt.) Ltd
                          </span>
                          <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-blue-700/65">
                            Sigma Construction Company
                          </span>
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="custom-scrollbar flex-1 overflow-y-auto bg-linear-to-b from-[#f7faff] to-white px-4 py-4">
                    <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50/70 px-4 py-3">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-blue-900">
                        <Award className="h-4 w-4" />
                        Engineering infrastructure since 1977
                      </div>
                    </div>

                    <Accordion
                      type="single"
                      collapsible
                      value={openAccordion || ""}
                      onValueChange={(value) => setOpenAccordion(value)}
                      className="flex w-full flex-col gap-2"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                  </div>

                  <div className="border-t border-blue-950/10 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                    <Link
                      href="/contact"
                      onClick={handleMobileLinkClick}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-extrabold text-white shadow-lg shadow-red-600/20 transition-all hover:-translate-y-0.5 hover:bg-red-700"
                    >
                      Get in Touch
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>

                    <div className="mt-4 grid gap-2 rounded-lg bg-[#f7faff] p-3 text-xs text-(--brand-copy) ring-1 ring-slate-200">
                      <p className="font-extrabold text-(--brand-navy)">Contact</p>
                      <a href="mailto:info@sigma-royal.com" className="flex items-center gap-2 font-semibold hover:text-red-600">
                        <Mail className="h-3.5 w-3.5 text-blue-700" />
                        info@sigma-royal.com
                      </a>
                      <a href="tel:+8802222229238" className="flex items-center gap-2 font-semibold hover:text-red-600">
                        <Phone className="h-3.5 w-3.5 text-blue-700" />
                        +88 02222229238
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar1;
