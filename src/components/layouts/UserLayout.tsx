import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Home,
  List,
  CreditCard,
  PieChart,
  Settings,
  LogOut,
  Bell
} from "lucide-react";
import Logo from "../atoms/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationCenter from "../organisms/NotificationCenter";
import { 
  getAllNotifications, 
  markAsRead, 
  markAllAsRead, 
  clearAllNotifications 
} from "@/services/notificationService";

const UserLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(getAllNotifications());

  // Refresh notifications on component mount and periodically
  useEffect(() => {
    // Initial load
    setNotifications(getAllNotifications());
    
    // Periodic refresh
    const refreshInterval = setInterval(() => {
      setNotifications(getAllNotifications());
    }, 60000); // Every minute
    
    return () => clearInterval(refreshInterval);
  }, []);

  const handleLogout = () => {
    // Clear auth token and redirect to login
    localStorage.removeItem("ww-auth-token");
    localStorage.removeItem("ww-user-role");
    navigate("/login");
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    setNotifications(getAllNotifications());
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setNotifications(getAllNotifications());
  };

  const handleClearAll = () => {
    clearAllNotifications();
    setNotifications([]);
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { path: "/transactions", label: "Transactions", icon: <List size={20} /> },
    { path: "/loan", label: "Loan", icon: <CreditCard size={20} /> },
    { path: "/savings", label: "Savings", icon: <PieChart size={20} /> },
    { path: "/notifications", label: "Notifications", icon: <Bell size={20} /> },
    { path: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <Logo variant="full" size="md" />
          </SidebarHeader>
          <SidebarContent className="p-2">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-ww-purple-500 text-white"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
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
              <h1 className="ml-4 font-semibold text-lg">
                {menuItems.find((item) => item.path === location.pathname)?.label || "WorkWealth"}
              </h1>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
              <NotificationCenter 
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onClearAll={handleClearAll}
              />
              <div className="flex ml-4 items-center">
                <div className="h-8 w-8 rounded-full bg-ww-purple-200 flex items-center justify-center text-ww-purple-800 font-medium dark:bg-ww-purple-800 dark:text-ww-purple-200">
                  AD
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium">Ade Dayo</div>
                  <div className="text-xs text-muted-foreground">User</div>
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

export default UserLayout;
