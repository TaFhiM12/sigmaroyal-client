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
      { title: "HYTORC Bolting Systems", url: "/hytorc/about", description: "Industrial torque tools, pumps and fasteners" },
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
  { title: "Contact", url: "/contact" },
];
