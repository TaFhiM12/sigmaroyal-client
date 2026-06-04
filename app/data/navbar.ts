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
      title: "About Us",
      url: "#",
      items: [
        { title: "Company Overview", url: "/preface" },
        { title: "Leadership Team", url: "/team" },
        { title: "Clients", url: "/clients" },
        { title: "HSE & Quality", url: "/qhse-policy" },
        { title: "Company History", url: "/at-a-glance" },
      ],
    },
    {
      title: "Services",
      url: "#",
      items: [
        {
          title: "Oil & Gas",
          url: "/expertise/oil-gas",
          description: "Pipeline construction, HDD, LPG solutions",
        },
        {
          title: "Pipeline Construction",
          url: "/projects",
          description: "Cross-country pipeline construction and commissioning",
        },
        {
          title: "HDD Services",
          url: "/projects",
          description: "Horizontal directional drilling and river crossings",
        },
        {
          title: "Power Infrastructure",
          url: "/expertise/power",
          description: "BOP installation, fabrication, construction",
        },
        {
          title: "HYTORC Solutions",
          url: "/hytorc/about",
          description: "Torque tools, pumps, fasteners and accessories",
        },
      ],
    },
    {
      title: "Projects",
      url: "#",
      items: [
        { title: "Completed Projects", url: "/projects?status=completed" },
        { title: "Ongoing Projects", url: "/projects?status=ongoing" },
        { title: "Project Gallery", url: "/projects" },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        { title: "Certifications", url: "/certificates" },
        { title: "Technical Documents", url: "/portfolio" },
        { title: "Case Studies", url: "/projects" },
        { title: "Downloads", url: "/preface" },
      ],
    },
    { title: "Contact", url: "/contact" },
];
