
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, LogOut, Bell } from "lucide-react";
import Logo from "../atoms/Logo";

const AgentLayout: React.FC = () => {
  const navigate = useNavigate();
  const [notifications] = useState(2); // Mock notification count

  const handleLogout = () => {
    // Clear auth token and redirect to login
    localStorage.removeItem("ww-auth-token");
    localStorage.removeItem("ww-user-role");
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <Logo variant="full" size="md" />
          </SidebarHeader>
          <SidebarContent className="p-2">
            <nav className="space-y-1">
              <a
                href="/agent"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors bg-ww-purple-500 text-white"
              >
                <span className="mr-3">
                  <Home size={20} />
                </span>
                <span>Dashboard</span>
              </a>
              {/* Add more agent menu items here */}
            </nav>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full flex items-center justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md px-3 py-2"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <header className="h-16 border-b flex items-center justify-between px-4">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="ml-4 font-semibold text-lg">Agent Dashboard</h1>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="relative">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-ww-purple-500 text-white text-xs flex items-center justify-center translate-x-1 -translate-y-1">
                    {notifications}
                  </span>
                )}
              </Button>
              <div className="flex ml-4 items-center">
                <div className="h-8 w-8 rounded-full bg-ww-green-200 flex items-center justify-center text-ww-green-800 font-medium">
                  FB
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium">Femi Badmus</div>
                  <div className="text-xs text-muted-foreground">Agent</div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AgentLayout;
