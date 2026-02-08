"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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
  icon?: React.ReactNode;
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
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://sigma-royal.com/images/logo-1.png",
    alt: "logo",
    title: "UAE CONTROLS",
  },
  menu = [
    { title: "Company", url: "#" },
    { title: "Products & Solutions", url: "#" },
    { title: "References", url: "#" },
    { title: "Certificates", url: "#" },
    { title: "Key partners", url: "#" },
    { title: "Careers", url: "#" },
    { title: "News", url: "#" },
    { title: "Funding", url: "#" },
    { title: "Contact", url: "#" },
    { title: "CZ", url: "#" },
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
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

  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <NavigationMenuItem key={item.title}>
          <NavigationMenuTrigger
            className={cn(
              "bg-transparent hover:bg-transparent px-3 py-2 text-sm font-medium transition-colors duration-200 text-[#1c2348 hover:text-red-600 data-[state=open]:text-red-600"
            )}
          >
            {item.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white text-gray-800 shadow-xl border">
            {item.items.map((subItem) => (
              <NavigationMenuLink asChild key={subItem.title} className="w-80">
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink
          href={item.url}
          className={cn(
            "group inline-flex h-10 items-center justify-center rounded-none px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-transparent focus:bg-transparent text-[#1c2348 hover:text-red-600 focus:text-red-600 data-[active=true]:text-red-600 data-[active=true]:bg-transparent"
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
        <AccordionItem key={item.title} value={item.title} className="border-b-0">
          <AccordionTrigger className="text-md py-0 font-semibold hover:text-red-600 hover:no-underline transition-colors duration-200 text-[#1c2348">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            {item.items.map((subItem) => (
              <SubMenuLink key={subItem.title} item={subItem} />
            ))}
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <a 
        key={item.title} 
        href={item.url} 
        className="text-md font-semibold hover:text-red-600 transition-colors duration-200 text-[#030419]"
      >
        {item.title}
      </a>
    );
  };

  const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
      <a
        className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors duration-200 outline-none select-none hover:bg-transparent hover:text-red-700 focus:bg-transparent text-[#030419]"
        href={item.url}
      >
        <div className="text-gray-700">{item.icon}</div>
        <div>
          <div className="text-sm font-semibold">{item.title}</div>
          {item.description && (
            <p className="text-sm leading-snug text-gray-600">
              {item.description}
            </p>
          )}
        </div>
      </a>
    );
  };

  return (
    <section
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-5",
        scrolled
          ? "bg-white shadow-sm"
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo */}
          <a 
            href={logo.url} 
            className="flex items-center gap-2 py-4 transition-colors duration-200 hover:text-red-600 text-[#030419]"
          >
            <Image
              width={80}
              height={40}
              src={logo.src}
              className="h-10 w-auto"
              alt={logo.alt}
            />
            <span className="text-lg font-bold tracking-tight transition-colors duration-200 hover:text-red-600 text-[#030419]">
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
          
          {/* Optional Auth Buttons */}
          {auth && (
            <div className="flex gap-2">
              <Button 
                asChild 
                variant="ghost" 
                size="sm"
                className="transition-colors duration-200 hover:bg-transparent text-[#030419] hover:text-red-600"
              >
                <a href={auth.login.url}>{auth.login.title}</a>
              </Button>
              <Button 
                asChild 
                size="sm"
                className="transition-colors duration-200 bg-gray-800 text-white hover:bg-gray-800"
              >
                <a href={auth.signup.url}>{auth.signup.title}</a>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a 
              href={logo.url} 
              className="flex items-center gap-2 transition-colors duration-200 hover:text-red-600 text-[#030419]"
            >
              <Image
                width={60}
                height={30}
                src={logo.src}
                className="h-8 w-auto"
                alt={logo.alt}
              />
              <span className="text-sm font-bold transition-colors duration-200 hover:text-red-600 text-[#1c2348">
                UAE CONTROLS
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="transition-colors duration-200 hover:bg-transparent text-[#1c2348] hover:text-red-600"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2 hover:text-red-600 transition-colors duration-200 text-[#1c2348">
                      <Image
                        width={60}
                        height={30}
                        src={logo.src}
                        className="h-8 w-auto"
                        alt={logo.alt}
                      />
                      <span className="text-gray-900">UAE CONTROLS</span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  {/* Mobile Auth Buttons */}
                  {auth && (
                    <div className="flex flex-col gap-3">
                      <Button 
                        asChild 
                        variant="outline"
                        className="text-gray-800 hover:text-red-600 hover:border-red-600 transition-colors duration-200"
                      >
                        <a href={auth.login.url}>{auth.login.title}</a>
                      </Button>
                      <Button 
                        asChild
                        className="bg-gray-800 text-white hover:bg-red-600 transition-colors duration-200"
                      >
                        <a href={auth.signup.url}>{auth.signup.title}</a>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };