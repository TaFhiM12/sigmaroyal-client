import { NavbarLogo, NavbarMenu } from "@/types/navbar";

export const navbarLogo: NavbarLogo = {
    url: "/",
    src: "/logo.png",
    alt: "The Royal Utilisation Services (Pvt.) Ltd",
    title: "The Royal Utilisation Services (Pvt.) Ltd",
  };

export const navbarMenu: NavbarMenu[] = [
  { title: "Home", url: "/" },
  {
    title: "Company",
    url: "/preface",
    items: [
      { title: "Company Overview", url: "/preface", description: "Leadership message and company introduction" },
      { title: "Company Portfolio", url: "/portfolio", description: "Corporate credentials and downloadable profile" },
      { title: "Mission & Vision", url: "/mission-vision", description: "Purpose, values and long-term direction" },
      { title: "Our Strength", url: "/our-strength", description: "People, equipment and certified capabilities" },
      { title: "At a Glance", url: "/at-a-glance", description: "Key facts and milestones since 1977" },
      { title: "Meet Our Team", url: "/team", description: "Browse every department using the team filters" },
    ],
  },
  {
    title: "Expertise",
    url: "/expertise",
    items: [
      { title: "All Expertise", url: "/expertise", description: "Complete engineering and delivery capabilities" },
      { title: "Oil & Gas", url: "/expertise#oil-gas", description: "NG, LPG and LNG pipeline infrastructure" },
      { title: "Power Sector", url: "/expertise#power", description: "BOP, piping, electrical and control systems" },
      { title: "Process Plant", url: "/expertise#process", description: "Refinery and petrochemical solutions" },
      { title: "Engineering & Services", url: "/expertise#engineering", description: "LPG equipment and turnkey services" },
    ],
  },
  {
    title: "Projects",
    url: "/projects",
    items: [
      { title: "All Projects", url: "/projects", description: "Explore the complete delivery portfolio" },
      { title: "Ongoing Projects", url: "/projects?status=ongoing", description: "Active construction and commissioning work" },
      { title: "Completed Projects", url: "/projects?status=completed", description: "Successfully delivered project references" },
      { title: "Upcoming Projects", url: "/projects?status=upcoming", description: "Planned and upcoming engagements" },
    ],
  },
  {
    title: "Resources",
    url: "/certificates",
    items: [
      { title: "Certifications", url: "/certificates", description: "ISO, safety and industry credentials" },
      { title: "Clients", url: "/clients", description: "Organizations that trust our delivery" },
      { title: "Corporate Portfolio", url: "/portfolio", description: "View and download the company portfolio" },
      { title: "Photo Gallery", url: "/media#photo-gallery", description: "Project sites, people and milestones" },
      { title: "Video Gallery", url: "/media#video-gallery", description: "Corporate and project media library" },
      { title: "Notices", url: "/notices", description: "Official announcements and updates" },
      { title: "QHSE Policy", url: "/qhse-policy", description: "Quality, health, safety and environment policy" },
    ],
  },
  {
    title: "HYTORC",
    url: "/hytorc/about",
    items: [
      { title: "About Royal-ABS", url: "/hytorc/about", description: "Authorized industrial bolting solutions" },
      { title: "Hydraulic Systems", url: "/hytorc/hydraulic", description: "Complete hydraulic tooling range" },
      { title: "Square Drive", url: "/hytorc/hydraulic#square-drive", description: "Square-drive hydraulic torque systems" },
      { title: "Hex Drive", url: "/hytorc/hydraulic#hex-drive", description: "Low-clearance hex-drive torque systems" },
      { title: "Pneumatic Torque Wrench", url: "/hytorc/pneumatic-torque-wrench", description: "Pneumatic precision torque systems" },
      { title: "Electric Torque Wrench", url: "/hytorc/electric-torque-wrench", description: "Portable electric bolting solutions" },
      { title: "Pumps", url: "/hytorc/pumps", description: "Hydraulic pump systems and controls" },
      { title: "Fasteners", url: "/hytorc/fasteners", description: "Industrial fastener technologies" },
      { title: "Accessories", url: "/hytorc/accessories", description: "Supporting equipment and accessories" },
    ],
  },
  { title: "Contact", url: "/contact" },
];
