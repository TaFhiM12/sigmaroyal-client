"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Bell, LogOut } from "lucide-react";
import AdminSidebar from "@/components/layouts/sidebar";
import { clearAdminSession, getAdminUser, isAdminLoggedIn } from "@/lib/admin-auth";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const user = getAdminUser();
  const adminName = user?.name || "Admin User";
  const adminEmail = user?.email || "admin@sigma-royal.com";

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.replace("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    clearAdminSession();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar onCollapse={setSidebarCollapsed} />
      
      {/* Main Content Area */}
      <main
        className={cn(
          "transition-all duration-300 min-h-screen",
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-72",
          "ml-0"
        )}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
              <span className="text-sm text-gray-500">/ Admin Panel</span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Quick Actions */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{adminName}</p>
                  <p className="text-xs text-gray-500">{adminEmail}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-semibold">
                  AD
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}