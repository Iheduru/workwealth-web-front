
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Context Provider
import { AuthProvider, useAuth } from "./contexts/AuthContext";

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

// Landing Page
import LandingPage from "./pages/LandingPage";

// NotFound
import NotFound from "./pages/NotFound";

// Install framer-motion
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

// Protected route component using Auth context
const ProtectedRoute = ({ children, allowedRoles = ["user", "agent", "admin"] }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect based on role
    if (user.role === "user") return <Navigate to="/dashboard" replace />;
    if (user.role === "agent") return <Navigate to="/agent" replace />;
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    
    // Fallback
    return <Navigate to="/login" replace />;
  }

  return children;
};

// AppRoutes component to use the Auth context
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Landing page */}
        <Route path="/landing" element={<LandingPage />} />
        
        {/* Public auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
          } />
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
          isAuthenticated 
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/landing" replace />
        } />

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
