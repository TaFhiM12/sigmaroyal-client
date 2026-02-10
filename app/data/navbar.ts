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
      title: "Clients", url: "/clients",},
    //   items: [
    //     { title: "Our Clients", url: "/clients" },
    //     { title: "Testimonials", url: "/testimonials" },
    //     { title: "Case Studies", url: "/case-studies" },
    //   ],
    // },
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
];
