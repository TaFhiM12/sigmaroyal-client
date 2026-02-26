import { NavbarLogo, NavbarMenu } from "@/types/navbar";

export const navbarLogo: NavbarLogo = {
    url: "/",
    src: "https://sigma-royal.com/images/logo-1.png",
    alt: "The Royal Utilisation Services (Pvt.) Ltd",
    title: "The Royal Utilisation Services (Pvt.) Ltd",
  };

export const navbarMenu: NavbarMenu[] = [
  { title: "Home", url: "/" },
    {
      title: "About",
      url: "#",
      items: [
        { title: "Preface", url: "/preface" },
        { title: "Company Portfolio", url: "/portfolio" },
        { title: "Mission & Vision", url: "/mission-vision" },
        { title: "Our Strength", url: "/our-strength" },
        { title: "At a Glance", url: "/at-a-glance" },
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
      url: "/projects",
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
      title: "Clients", url: "/clients"},
    {
      title: "Team",
      url: "#",
      items: [
        { title: "Core Management", url: "/team/core-management" },
        { title: "HR & Admin", url: "/team/hr-admin" },
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
];
