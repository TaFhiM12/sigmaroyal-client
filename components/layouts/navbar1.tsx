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
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const dropdownCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollingUp = currentScrollY < lastScrollY.current;

        setScrolled(currentScrollY > 50);
        setNavVisible(currentScrollY < 24 || scrollingUp || currentScrollY < 110);
        lastScrollY.current = Math.max(currentScrollY, 0);
        ticking.current = false;
      });
    };

    lastScrollY.current = window.scrollY;
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

  useEffect(() => {
    if (sheetOpen || activeDropdown) {
      setNavVisible(true);
    }
  }, [activeDropdown, sheetOpen]);

  const textColorClass = scrolled ? "text-blue-950" : "text-white";
  const hoverTextColorClass = "hover:text-red-600";

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
      case "About Us":
        return <Building2 className={iconClass} />;
      case "Services":
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
      "About Us": [Building2, UsersIcon, Award, ShieldIcon, HistoryIcon],
      Services: [Wrench, FolderKanban, Sparkles, Building2, Award],
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
      case "About Us":
        return "Company";
      case "Services":
        return "Capabilities";
      case "Projects":
        return "Delivery";
      case "Resources":
        return "Knowledge Base";
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
          "absolute top-full mt-2 w-[410px] overflow-hidden rounded-2xl border border-white/70 bg-white/96 shadow-2xl shadow-blue-950/20 backdrop-blur-2xl z-50",
          "before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-['']",
          "transition-all duration-500 ease-out origin-top",
          item.title === "Resources" || item.title === "Projects" ? "right-0" : "left-0",
          activeDropdown === item.title 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-[0.97] -translate-y-3 pointer-events-none"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(37,99,235,0.10),transparent_32%),radial-gradient(circle_at_92%_8%,rgba(200,30,43,0.08),transparent_30%)]" />
        <div className="relative border-b border-blue-950/8 px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-blue-700">
                {getDropdownEyebrow(item.title)}
              </p>
              <h3 className="mt-1 text-lg font-extrabold text-slate-950">
                {item.title}
              </h3>
            </div>
            <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-800">
              {item.items.length} Links
            </span>
          </div>
        </div>

        <div className="relative grid gap-1.5 p-2">
          {item.items.map((subItem, index) => (
            <Link
              key={subItem.title}
              href={subItem.url}
              className={cn(
                "group grid grid-cols-[40px_1fr_22px] items-start gap-3 rounded-xl border border-transparent px-3.5 py-3 transition-all duration-200",
                "text-slate-900 hover:-translate-y-0.5 hover:border-blue-100 hover:bg-blue-50/85 hover:shadow-lg hover:shadow-blue-950/8"
              )}
              onClick={() => setActiveDropdown(null)}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-950 text-white shadow-sm shadow-blue-950/15 transition-all duration-200 group-hover:bg-blue-800 group-hover:shadow-blue-700/20">
                {getDropdownIcon(item.title, index)}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-extrabold leading-tight text-slate-950 transition-colors group-hover:text-blue-950">
                  {subItem.title}
                </span>
                {subItem.description ? (
                  <span className="mt-1.5 block text-xs leading-relaxed text-slate-600">
                    {subItem.description}
                  </span>
                ) : (
                  <span className="mt-1.5 block text-xs leading-relaxed text-slate-500">
                    Explore company information and resources
                  </span>
                )}
              </span>
              <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all duration-200 group-hover:bg-red-600 group-hover:text-white">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="relative border-t border-blue-950/8 bg-slate-50/80 px-5 py-3">
          <Link
            href={item.url === "#" ? "/contact" : item.url}
            onClick={() => setActiveDropdown(null)}
            className="group flex items-center justify-between rounded-lg text-xs font-extrabold uppercase tracking-[0.1em] text-blue-900 transition-colors hover:text-red-600"
          >
            <span>Need help choosing?</span>
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
    if (item.items) {
      return (
        <div
          key={item.title}
          className="relative"
          onMouseEnter={() => openDropdown(item.title)}
          onMouseLeave={closeDropdown}
        >
          <button
            onClick={() => toggleDropdown(item.title)}
            className={cn(
              "group relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-extrabold transition-all duration-200",
              textColorClass,
              hoverTextColorClass,
              scrolled ? "hover:bg-blue-50" : "hover:bg-white/10",
              activeDropdown === item.title && (scrolled ? "bg-blue-950 text-white shadow-sm shadow-blue-950/15 hover:bg-blue-900 hover:text-white" : "bg-white/12 text-white ring-1 ring-white/12 hover:text-white")
            )}
          >
            {item.title}
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              activeDropdown === item.title && "rotate-180"
            )} />
            
            <div className={cn(
              "absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full bg-red-500 transition-all duration-300",
              activeDropdown === item.title && "w-4/5"
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
          "group relative rounded-lg px-3 py-2 text-sm font-extrabold transition-all duration-200",
          textColorClass,
          hoverTextColorClass,
          scrolled ? "hover:bg-blue-50 hover:text-red-600" : "hover:bg-white/10 hover:text-red-300"
        )}
      >
        {item.title}
        <div className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-red-500 transition-all duration-300 group-hover:w-4/5" />
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
              "group rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-left shadow-sm",
              "text-[15px] font-extrabold text-slate-900 hover:no-underline",
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
                    "group relative rounded-lg border border-slate-200 bg-white p-3 no-underline shadow-sm outline-none",
                    "transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/70 hover:shadow-md"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-bold leading-tight text-slate-900">
                      {subItem.title}
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors group-hover:text-red-600" />
                  </div>
                  {subItem.description && (
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
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
          "group flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-[15px]",
          "font-extrabold text-slate-900 shadow-sm transition-all duration-200",
          "hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-950 hover:shadow-md",
        )}
      >
        <span className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-950 text-white transition-colors group-hover:bg-blue-800">
            {getMobileIcon(item.title)}
          </span>
          <span>{item.title}</span>
        </span>
        <ArrowUpRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-red-600" />
      </Link>
    );
  };

  return (
    <section
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-all duration-300 ease-out",
        navVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        scrolled ? "py-3" : "py-4",
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-2xl">
        {/* Desktop Menu */}
        <nav
          className={cn(
            "hidden items-center justify-between rounded-2xl border px-4 py-2.5 lg:flex",
            "shadow-lg shadow-blue-950/10 backdrop-blur-xl transition-all duration-300",
            scrolled
              ? "border-blue-950/10 bg-white/92"
              : "border-white/12 bg-blue-950/70"
          )}
        >
          <Link
            href={logo.url}
            className={cn(
              "flex items-center gap-3 transition-all duration-300 group hover:scale-[1.02]",
              "rounded-xl px-2 py-1.5",
            )}
          >
            <div className="relative">
              <Image
                width={80}
                height={40}
                src={logo.src}
                className="h-10 w-auto"
                alt={logo.alt}
              />
              <div className="absolute -inset-1 bg-blue-600/20 blur-sm group-hover:bg-blue-600/30 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100"></div>
            </div>
            
            <div className="flex flex-col leading-tight">
              <span className={cn(
                "text-lg font-extrabold tracking-normal bg-linear-to-r bg-clip-text text-transparent xl:text-xl",
                scrolled 
                  ? "from-blue-950 to-blue-700 group-hover:from-blue-900 group-hover:to-red-600"
                  : "from-white to-blue-100 group-hover:from-blue-200 group-hover:to-white",
                "transition-all duration-300"
              )}>
                The Royal Utilisation <br/>
              </span>
              <span className={cn(
                "text-[11px] font-extrabold uppercase tracking-[0.08em]",
                scrolled 
                  ? "text-red-700 group-hover:text-blue-900"
                  : "text-white/90 group-hover:text-red-300",
                "transition-all duration-300"
              )}>
                SERVICES (PVT.) LTD
              </span>
            </div>
          </Link>
          
          <div className="flex items-center gap-1">
            {menu.map((item) => renderMenuItem(item))}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl border px-3 py-2.5 shadow-lg shadow-blue-950/10 backdrop-blur-xl",
              scrolled ? "border-blue-950/10 bg-white/92" : "border-white/12 bg-blue-950/72"
            )}
          >
            <Link
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
                className="h-8 w-auto shrink-0"
                alt={logo.alt}
              />
              <div className="flex min-w-0 max-w-[260px] flex-col leading-tight">
                <span
                  className={cn(
                    "truncate text-sm font-extrabold tracking-normal transition-colors duration-200",
                    textColorClass,
                    hoverTextColorClass,
                  )}
                >
                  The Royal Utilisation Services (Pvt.) Ltd
                </span>
              </div>
            </Link>
            
            <div className="flex items-center gap-2">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button 
                    className={cn(
                      "rounded-lg p-2 transition-all duration-200 hover:bg-white/10",
                      textColorClass,
                      hoverTextColorClass
                    )}
                    aria-label="Open menu"
                  >
                    <Menu className="size-5" />
                  </button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="h-dvh w-[92vw] max-w-[430px] gap-0 overflow-hidden border-l border-blue-950/10 bg-slate-50 p-0 shadow-2xl sm:max-w-[430px]"
                >
                  <div className="flex h-full flex-col">
                    <SheetHeader className="border-b border-blue-950/10 bg-white p-0">
                      <SheetTitle>
                        <Link 
                          href={logo.url} 
                          onClick={() => setSheetOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-5 py-5 pr-12 text-left transition-colors duration-200",
                            "text-slate-950 hover:text-blue-950"
                          )}
                        >
                          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-blue-100">
                            <Image
                              width={60}
                              height={30}
                              src={logo.src}
                              className="h-8 w-auto"
                              alt={logo.alt}
                            />
                          </span>
                          <span className="flex min-w-0 flex-col leading-tight">
                            <span className="text-[15px] font-extrabold leading-snug text-slate-950">
                              The Royal Utilisation Services (Pvt.) Ltd
                            </span>
                            <span className="mt-1 text-xs font-semibold text-blue-700">
                              Energy Infrastructure & EPC
                            </span>
                          </span>
                        </Link>
                      </SheetTitle>
                    </SheetHeader>
                    
                    <div className="custom-scrollbar flex-1 overflow-y-auto bg-linear-to-b from-slate-50 to-white px-4 py-4">
                      <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50/70 px-4 py-3">
                        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-blue-900">
                          <Award className="h-4 w-4" />
                          Since 1977
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-700">
                          Pipeline, power, oil and gas infrastructure services across Bangladesh.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
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
                    </div>
                    
                    <div className="border-t border-blue-950/10 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                      <div className="grid grid-cols-2 gap-3">
                        <Link 
                          href="/certifications" 
                          onClick={handleMobileLinkClick}
                          className="rounded-lg bg-blue-950 px-3 py-3 text-center text-sm font-extrabold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-md"
                        >
                          Certifications
                        </Link>
                        <Link 
                          href="/contact" 
                          onClick={handleMobileLinkClick}
                          className="rounded-lg bg-red-600 px-3 py-3 text-center text-sm font-extrabold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md"
                        >
                          Get Quote
                        </Link>
                      </div>
                      
                      <div className="mt-4 grid gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-700 ring-1 ring-slate-200">
                        <p className="font-extrabold text-slate-950">Contact Info</p>
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
      </div>
    </section>
  );
};

export default Navbar1;
