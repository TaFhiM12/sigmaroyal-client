"use client";

import React, { useEffect, useState, useRef } from "react";
import { Menu, ChevronDown } from "lucide-react";
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Close dropdown if clicked outside
      if (activeDropdown) {
        const dropdownElement = dropdownRefs.current[activeDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const textColorClass = scrolled ? "text-gray-800" : "text-white";
  const hoverTextColorClass = "hover:text-red-600";

  const toggleDropdown = (menuTitle: string) => {
    setActiveDropdown(activeDropdown === menuTitle ? null : menuTitle);
  };

  const DesktopDropdown = ({ item }: { item: MenuItem }) => {
    if (!item.items) return null;

    return (
      <div 
        ref={(el) => {
          // Store the ref without returning anything
          dropdownRefs.current[item.title] = el;
        }}
        className={cn(
          "absolute top-full left-0 mt-2 bg-white shadow-2xl border border-gray-200 rounded-lg py-3 min-w-70 z-50",
          "transition-all duration-300 origin-top",
          activeDropdown === item.title 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="space-y-1">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              href={subItem.url}
              className={cn(
                "flex flex-col px-4 py-3 mx-2 rounded-md transition-all duration-200",
                "hover:bg-red-50 hover:text-red-700 text-gray-800",
                "border-l-2 border-transparent hover:border-red-600"
              )}
              onClick={() => setActiveDropdown(null)}
            >
              <div className="text-sm font-semibold">{subItem.title}</div>
              {subItem.description && (
                <p className="text-xs text-gray-600 mt-1">
                  {subItem.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <div key={item.title} className="relative">
          <button
            onClick={() => toggleDropdown(item.title)}
            onMouseEnter={() => setActiveDropdown(item.title)}
            className={cn(
              "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-200 group relative",
              textColorClass,
              hoverTextColorClass,
              activeDropdown === item.title && "text-red-600"
            )}
          >
            {item.title}
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              activeDropdown === item.title && "rotate-180"
            )} />
            
            {/* Active indicator */}
            <div className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-600 transition-all duration-300",
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
          "px-3 py-2 text-sm font-medium transition-all duration-200 relative group",
          textColorClass,
          hoverTextColorClass,
          "hover:text-red-600"
        )}
      >
        {item.title}
        {/* Hover indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-4/5" />
      </Link>
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
                <Link
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
        className={cn(
          "text-sm font-semibold transition-colors duration-200 py-4 border-b border-gray-100 last:border-b-0",
          "text-gray-800",
          hoverTextColorClass,
        )}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <section
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white shadow-lg py-3"
          : "bg-transparent py-4",
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo with Enhanced Company Name */}
          <Link
            href={logo.url}
            className={cn(
              "flex items-center gap-3 transition-all duration-300 group hover:scale-[1.02]",
              "bg-linear-to-r from-transparent via-transparent to-transparent group-hover:from-white/5 group-hover:via-white/10 group-hover:to-transparent",
              "rounded-lg px-3 py-2",
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
              <div className="absolute -inset-1 bg-red-600/20 blur-sm group-hover:bg-red-600/30 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100"></div>
            </div>
            
            <div className="flex flex-col leading-tight">
              <span className={cn(
                "text-xl font-extrabold tracking-tight bg-linear-to-r bg-clip-text text-transparent",
                scrolled 
                  ? "from-red-700 to-red-500 group-hover:from-red-600 group-hover:to-red-400"
                  : "from-white to-gray-200 group-hover:from-red-300 group-hover:to-white",
                "transition-all duration-300"
              )}>
                The Royal Utilisation <br/>
              </span>
              <span className={cn(
                "text-sm font-bold tracking-wider",
                scrolled 
                  ? "text-red-700 group-hover:text-red-600"
                  : "text-white/90 group-hover:text-red-300",
                "transition-all duration-300"
              )}>
                SERVICES (PVT.) LTD
              </span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-1">
            {menu.map((item) => renderMenuItem(item))}
          </div>

          {/* Contact Button */}
          
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo with Full Company Name - Mobile */}
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
                className="h-8 w-auto"
                alt={logo.alt}
              />
              <div className="flex flex-col leading-tight max-w-75">
                <span
                  className={cn(
                    "text-sm font-bold tracking-tight transition-colors duration-200",
                    textColorClass,
                    hoverTextColorClass,
                  )}
                >
                  The Royal Utilisation Services (Pvt.) Ltd
                </span>
                
              </div>
            </Link>
            
            <div className="flex items-center gap-2">
              
              
              <Sheet>
                <SheetTrigger asChild>
                  <button 
                    className={cn(
                      "p-2 transition-colors duration-200 rounded-md",
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
                  className="overflow-y-auto w-full sm:max-w-md p-0 h-screen"
                >
                  <div className="h-full flex flex-col">
                    <SheetHeader className="p-6 border-b border-gray-100 bg-white">
                      <SheetTitle>
                        <Link href={logo.url} className={cn(
                          "flex items-center gap-2 transition-colors duration-200",
                          "text-gray-900",
                          hoverTextColorClass
                        )}>
                          <Image
                            width={60}
                            height={30}
                            src={logo.src}
                            className="h-8 w-auto"
                            alt={logo.alt}
                          />
                          <div className="flex flex-col leading-tight mt-2">
                            <span className="text-sm font-bold text-gray-900">
                              The Royal Utilisation Services (Pvt.) Ltd
                            </span>
                          </div>
                        </Link>
                      </SheetTitle>
                    </SheetHeader>
                    
                    <div className="flex-1 overflow-y-auto px-6 bg-gray-50">
                      <div className="flex flex-col">
                        <Accordion
                          type="single"
                          collapsible
                          className="flex w-full flex-col"
                        >
                          {menu.map((item) => renderMobileMenuItem(item))}
                        </Accordion>
                      </div>
                    </div>
                    
                    {/* Mobile Footer */}
                    <div className="p-6 bg-white border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-3">
                        <Link 
                          href="/certifications" 
                          className="text-sm font-medium text-white bg-gray-800 hover:bg-red-600 transition-colors duration-200 text-center py-3 rounded-md"
                        >
                          Certifications
                        </Link>
                        <Link 
                          href="/contact" 
                          className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 text-center py-3 rounded-md"
                        >
                          Get Quote
                        </Link>
                      </div>
                      
                      {/* Contact Info */}
                      <div className="mt-6 text-xs text-gray-600">
                        <p className="font-semibold mb-2">Contact Info:</p>
                        <p>Email: info@sigma-royal.com</p>
                        <p>Phone: +88 02222229238</p>
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