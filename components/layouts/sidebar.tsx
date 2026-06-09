"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Award,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  FolderKanban,
  FolderTree,
  Wrench,
  ShieldCheck,
  Bell,
  Users,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: SidebarItem[];
  badge?: string;
}

interface AdminSidebarProps {
  className?: string;
  onCollapse?: (collapsed: boolean) => void;
}

const AdminSidebar = ({ className, onCollapse }: AdminSidebarProps) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("adminSidebarCollapsed");
      return savedState === "true";
    }
    return false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Save collapsed state
  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("adminSidebarCollapsed", String(newState));
    onCollapse?.(newState);
  };

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  // Admin navigation items
  const adminMenuItems: SidebarItem[] = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Content Management",
      url: "#",
      icon: FolderTree,
      items: [
        // { title: "Home Page", url: "/admin/home", icon: Home },
        // { title: "About Pages", url: "/admin/about", icon: Info },
        // { title: "Expertise", url: "/admin/expertise", icon: Star },
        { title: "Projects", url: "/admin/projects", icon: FolderKanban },
        { title: "Team Members", url: "/admin/team", icon: Users },
        { title: "HYTORC Products", url: "/admin/hytorc", icon: Wrench },
        { title: "QHSE Policy", url: "/admin/qhse-policy", icon: ShieldCheck },
        // { title: "Resources", url: "/admin/resources", icon: FileText },
        // { title: "Team Members", url: "/admin/team", icon: Users },
        // { title: "Clients", url: "/admin/clients", icon: Building2 },
      ],
    },
    // {
    //   title: "Media Gallery",
    //   url: "/admin/media",
    //   icon: ImageIcon,
    //   badge: "New",
    // },
    {
      title: "Certifications",
      url: "/admin/certifications",
      icon: Award,
    },
    // {
    //   title: "Portfolio",
    //   url: "/admin/portfolio",
    //   icon: Briefcase,
    // },
    // {
    //   title: "Notices",
    //   url: "/admin/notices",
    //   icon: Bell,
    // },
    // {
    //   title: "Contact Messages",
    //   url: "/admin/messages",
    //   icon: MessageSquare,
    // },
    // {
    //   title: "Users & Roles",
    //   url: "#",
    //   icon: UserCog,
    //   items: [
    //     { title: "All Users", url: "/admin/users", icon: Users },
    //     { title: "Roles & Permissions", url: "/admin/roles", icon: Shield },
    //     { title: "Activity Logs", url: "/admin/logs", icon: Database },
    //   ],
    // },
    // {
    //   title: "Analytics",
    //   url: "/admin/analytics",
    //   icon: BarChart3,
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings,
    //   items: [
    //     { title: "General Settings", url: "/admin/settings/general", icon: Globe },
    //     { title: "SEO Settings", url: "/admin/settings/seo", icon: Lock },
    //     { title: "Email Templates", url: "/admin/settings/email", icon: Mail },
    //     { title: "Backup", url: "/admin/settings/backup", icon: Database },
    //   ],
    // },
  ];

  const isActive = (url: string) => {
    if (url === "#") return false;
    if (url === "/admin") return pathname === url;
    return pathname.startsWith(url);
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.items && item.items.length > 0;
    const active = isActive(item.url);
    const isExpanded = expandedItems.has(item.title);
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <div key={item.title} className="w-full">
          <button
            onClick={() => !collapsed && toggleExpand(item.title)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              "hover:bg-linear-to-r hover:from-red-50 hover:to-red-50/50",
              active && "bg-linear-to-r from-red-50 to-red-50/50 text-red-700",
              !active && "text-[var(--brand-muted)] hover:text-red-600",
              collapsed && "justify-center px-2"
            )}
          >
            <Icon className={cn("h-5 w-5 shrink-0", active && "text-red-600")} />
            
            {!collapsed && (
              <>
                <span className={cn("flex-1 text-left text-sm font-medium", active && "font-semibold")}>
                  {item.title}
                </span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded">
                    {item.badge}
                  </span>
                )}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )}
                />
              </>
            )}
          </button>

          {!collapsed && isExpanded && (
            <div className="ml-6 mt-1 space-y-1 border-l-2 border-[#d8e4f5] pl-3">
              {item.items!.map((subItem) => renderSidebarItem(subItem, level + 1))}
            </div>
          )}

          {collapsed && hasChildren && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute left-full ml-2 z-50 hidden group-hover:block">
                    <div className="bg-[var(--brand-navy)] text-white text-sm rounded-md px-3 py-2 whitespace-nowrap">
                      {item.title}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-[var(--brand-navy)] text-white">
                  <div className="space-y-1">
                    {item.items!.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.url}
                        className="block px-2 py-1 hover:bg-blue-950/70 rounded"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    }

    const linkContent = (
      <Link
        key={item.title}
        href={item.url}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
          "hover:bg-linear-to-r hover:from-red-50 hover:to-red-50/50",
          active && "bg-linear-to-r from-red-50 to-red-50/50 text-red-700",
          !active && "text-[var(--brand-muted)] hover:text-red-600",
          collapsed && "justify-center px-2"
        )}
      >
        <Icon className={cn("h-5 w-5 shrink-0", active && "text-red-600")} />
        
        {!collapsed && (
          <>
            <span className={cn("text-sm font-medium", active && "font-semibold")}>
              {item.title}
            </span>
            {item.badge && (
              <span className="px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded ml-auto">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <TooltipProvider key={item.title}>
          <Tooltip>
            <TooltipTrigger asChild>
              {linkContent}
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[var(--brand-navy)] text-white">
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return linkContent;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg text-[var(--brand-muted)]"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-[var(--brand-navy)]/50 z-50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-white border-r border-[#d8e4f5] transition-all duration-300 z-50",
          "flex flex-col",
          collapsed ? "w-20" : "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Logo Area */}
        <div className={cn(
          "h-16 flex items-center border-b border-[#d8e4f5] px-4",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed ? (
            <>
              <Link href="/admin" className="flex items-center gap-2">
                <Image
                  src="https://sigma-royal.com/images/logo-1.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[var(--brand-navy)]">Admin Panel</span>
                  <span className="text-xs text-[var(--brand-muted)]">The Royal Utilisation</span>
                </div>
              </Link>
              <button
                onClick={toggleCollapse}
                className="p-1.5 rounded-lg hover:bg-[#eef4ff] transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-[var(--brand-muted)]" />
              </button>
            </>
          ) : (
            <>
              <Image
                src="https://sigma-royal.com/images/logo-1.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <button
                onClick={toggleCollapse}
                className="p-1.5 rounded-lg hover:bg-[#eef4ff] transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-[var(--brand-muted)]" />
              </button>
            </>
          )}
        </div>

        {/* User Profile */}
        <div className={cn(
          "p-4 border-b border-[#d8e4f5]",
          collapsed && "flex justify-center"
        )}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-red-500 to-red-600 flex items-center justify-center text-white font-semibold">
                AD
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--brand-navy)]">Admin User</p>
                <p className="text-xs text-[var(--brand-muted)]">Super Administrator</p>
              </div>
              <button className="p-1 hover:bg-[#eef4ff] rounded-lg">
                <Settings className="h-4 w-4 text-[var(--brand-muted)]" />
              </button>
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-10 h-10 rounded-full bg-linear-to-r from-red-500 to-red-600 flex items-center justify-center text-white font-semibold cursor-pointer">
                    AD
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-[var(--brand-navy)] text-white">
                  <p>Admin User</p>
                  <p className="text-xs">Super Administrator</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {adminMenuItems.map((item) => renderSidebarItem(item))}
          </div>
        </nav>

        {/* Footer Actions */}
        <div className={cn(
          "border-t border-[#d8e4f5] p-4",
          collapsed && "flex justify-center"
        )}>
          {!collapsed ? (
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--brand-muted)] hover:bg-red-50 hover:text-red-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="text-sm font-medium">Notifications</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--brand-muted)] hover:bg-red-50 hover:text-red-600 transition-colors">
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-2 rounded-lg text-[var(--brand-muted)] hover:bg-red-50 hover:text-red-600">
                    <LogOut className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-[var(--brand-navy)] text-white">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
