
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../atoms/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-ww-purple-500 text-white p-8 flex-col">
        <Logo variant="full" size="lg" className="text-white" />
        
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6">
              Grow your financial future with WorkWealth
            </h1>
            <p className="text-lg text-ww-purple-100 mb-8">
              Access savings, loans, and easy payments - all designed for informal workers across Africa.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Smart Savings</h3>
                  <p className="text-sm text-ww-purple-100">Save daily, weekly, or set targets easily</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Quick Loans</h3>
                  <p className="text-sm text-ww-purple-100">Get access to credit when you need it most</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Simple Transfers</h3>
                  <p className="text-sm text-ww-purple-100">Send and receive money instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col p-6 md:w-1/2">
        <div className="md:hidden mb-8">
          <Logo variant="full" size="md" />
        </div>
        
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        
        <div className="flex-grow flex items-center justify-center py-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} WorkWealth. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
