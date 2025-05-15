
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Kyc from "./pages/auth/Kyc";

// User Pages
import Dashboard from "./pages/user/Dashboard";
import Transactions from "./pages/user/Transactions";
import LoanApplication from "./pages/user/LoanApplication";
import SavingsSetup from "./pages/user/SavingsSetup";
import UserSettings from "./pages/user/UserSettings";

// Agent Pages
import AgentDashboard from "./pages/agent/AgentDashboard";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// Layout Components
import AuthLayout from "./components/layouts/AuthLayout";
import UserLayout from "./components/layouts/UserLayout";
import AgentLayout from "./components/layouts/AgentLayout";
import AdminLayout from "./components/layouts/AdminLayout";

// NotFound
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Mock auth check - replace with actual auth logic
const isAuthenticated = () => {
  return localStorage.getItem("ww-auth-token") !== null;
};

// Mock role check - replace with actual role logic
const getUserRole = () => {
  return localStorage.getItem("ww-user-role") || "user";
};

const ProtectedRoute = ({ children, allowedRoles = ["user", "agent", "admin"] }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getUserRole();
  if (!allowedRoles.includes(userRole)) {
    // Redirect based on role
    if (userRole === "user") return <Navigate to="/dashboard" replace />;
    if (userRole === "agent") return <Navigate to="/agent" replace />;
    if (userRole === "admin") return <Navigate to="/admin" replace />;
    
    // Fallback
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/kyc" element={
              <ProtectedRoute>
                <Kyc />
              </ProtectedRoute>
            } />
          </Route>

          {/* User routes */}
          <Route element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/loan" element={<LoanApplication />} />
            <Route path="/savings" element={<SavingsSetup />} />
            <Route path="/settings" element={<UserSettings />} />
          </Route>

          {/* Agent routes */}
          <Route element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentLayout />
            </ProtectedRoute>
          }>
            <Route path="/agent" element={<AgentDashboard />} />
          </Route>

          {/* Admin routes */}
          <Route element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Index redirect */}
          <Route path="/" element={
            isAuthenticated() 
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          } />

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
