
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/atoms/Logo";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("ww-auth-token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Logo variant="full" size="md" />
          <div className="hidden md:block">
            <Button variant="outline" className="mr-2" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button className="bg-ww-purple-500 hover:bg-ww-purple-600" onClick={() => navigate("/register")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Financial solutions for{" "}
            <span className="text-ww-purple-500">informal workers</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10">
            Save money, access loans, and make payments easily with WorkWealth. 
            Built for Africa's informal workforce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-ww-purple-500 hover:bg-ww-purple-600 h-12 px-8 text-lg"
              onClick={() => navigate("/register")}
            >
              Create an account
            </Button>
            <Button 
              variant="outline" 
              className="h-12 px-8 text-lg"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          </div>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Smart Savings</h3>
            <p className="text-muted-foreground">
              Save money daily, weekly, or set specific goals for your future needs.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Quick Loans</h3>
            <p className="text-muted-foreground">
              Access credit when you need it most with simple application process.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Simple Transfers</h3>
            <p className="text-muted-foreground">
              Send and receive money instantly with low transaction fees.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo variant="full" size="md" />
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              © {new Date().getFullYear()} WorkWealth. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
