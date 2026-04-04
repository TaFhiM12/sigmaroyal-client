"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import AdminSidebar from "@/components/layouts/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
                  <p className="text-sm font-medium text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">admin@sigma-royal.com</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-sm font-semibold">
                  AD
                </div>
              </div>
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