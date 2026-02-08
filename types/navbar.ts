export interface NavbarLogo {
  url: string;
  src: string;
  alt: string;
  title: string;
}

export interface NavbarMenuItem {
  title: string;
  url: string;
  description?: string;
}

export interface NavbarMenu {
  title: string;
  url: string;
  items?: NavbarMenuItem[];
}

export interface Navbar1Props {
  logo?: NavbarLogo;
  menu?: NavbarMenu[];
  className?: string;
}

export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  items?: MenuItem[];
}