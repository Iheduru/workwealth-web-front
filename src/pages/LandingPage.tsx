
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Logo from "@/components/atoms/Logo";
import { Shield, PiggyBank, CreditCard, Users, Check, ArrowRight, Menu, X } from "lucide-react";

const LandingPage = () => {
  const [demoBalance, setDemoBalance] = useState(10000);
  const [showTransfer, setShowTransfer] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    if (showTransfer) {
      const timer = setTimeout(() => {
        setDemoBalance(prev => prev - 2000);
        setTransferComplete(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [showTransfer]);
  
  const resetDemo = () => {
    setDemoBalance(10000);
    setShowTransfer(false);
    setTransferComplete(false);
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent" />
        
        <div className="relative container mx-auto px-6 py-6">
          {/* Navigation */}
          <nav className="flex justify-between items-center">
            <Logo variant="full" size="md" className="text-white z-10" />
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/about">
                <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10 font-medium">
                  About
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10 font-medium">
                  Features
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10 font-medium">
                  Contact
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-900 font-medium">
                  Sign In
                </Button>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              className="lg:hidden text-white p-2 hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden absolute top-20 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-6 z-50"
            >
              <div className="flex flex-col gap-4">
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-white hover:bg-white/10 justify-start">
                    About
                  </Button>
                </Link>
                <Link to="/features" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-white hover:bg-white/10 justify-start">
                    Features
                  </Button>
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-white hover:bg-white/10 justify-start">
                    Contact
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-white text-slate-900 hover:bg-white/90">
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
          
          {/* Hero Content */}
          <div className="py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8 text-white">
                Financial Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Everyone</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-10 text-slate-300 max-w-2xl leading-relaxed">
                Access savings, loans, and easy payments designed for informal workers across Africa. Build your financial future with WorkWealth.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 font-semibold px-8 py-4 text-lg shadow-xl">
                    Get Started
                  </Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            {/* Demo Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="bg-gradient-to-r from-slate-50 to-purple-50 p-6 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                    <Users size={24} />
                  </div>
                  <span className="ml-4 font-semibold text-slate-900 text-lg">WorkWealth Demo</span>
                </div>
                <Button variant="ghost" size="sm" onClick={resetDemo} className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                  Reset
                </Button>
              </div>
              
              <div className="p-8 bg-white">
                <p className="text-sm text-slate-600 mb-2 font-medium">Wallet Balance</p>
                <p className="text-3xl font-bold text-slate-900 mb-8">₦{demoBalance.toLocaleString()}</p>
                
                <div className="space-y-6">
                  {!showTransfer ? (
                    <Button 
                      onClick={() => setShowTransfer(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 py-3 font-semibold"
                    >
                      Transfer Money
                    </Button>
                  ) : !transferComplete ? (
                    <div className="space-y-6">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-4 bg-slate-200 rounded"></div>
                          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                        </div>
                      </div>
                      <p className="text-sm text-center text-slate-600 font-medium">Processing transfer...</p>
                    </div>
                  ) : (
                    <div className="border border-green-200 rounded-xl p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                          <Check size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-green-800">Transfer Success!</p>
                          <p className="text-sm text-green-700">₦2,000 sent to Abayomi</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm border-t border-white/10 py-12">
          <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-bold text-4xl text-white mb-2">10K+</p>
              <p className="text-slate-300 font-medium">Active Users</p>
            </div>
            <div>
              <p className="font-bold text-4xl text-white mb-2">₦50M+</p>
              <p className="text-slate-300 font-medium">Loan Disbursed</p>
            </div>
            <div>
              <p className="font-bold text-4xl text-white mb-2">15+</p>
              <p className="text-slate-300 font-medium">Partner Banks</p>
            </div>
            <div>
              <p className="font-bold text-4xl text-white mb-2">4.9/5</p>
              <p className="text-slate-300 font-medium">User Rating</p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">Our Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We provide comprehensive financial solutions tailored to your needs
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
                <CardContent className="pt-8 p-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white mb-6 shadow-lg">
                    <PiggyBank size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">Smart Savings</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Set savings goals, create automatic deposits, and watch your money grow with competitive interest rates.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Daily, weekly or monthly savings</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Target-based savings plans</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Group savings options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
                <CardContent className="pt-8 p-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-6 shadow-lg">
                    <CreditCard size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">Quick Loans</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Access affordable credit when you need it most, with quick approvals and flexible repayment terms.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">No collateral required</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Approval in under 24 hours</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Competitive interest rates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
                <CardContent className="pt-8 p-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white mb-6 shadow-lg">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">Secure Transactions</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Send and receive money instantly with bank-level security and minimal transaction fees.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Bank transfers</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Bill payments</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Airtime & data purchase</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Getting started with WorkWealth is quick and easy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                step: 1,
                title: "Create Account",
                description: "Sign up with your basic information in just minutes",
              },
              {
                step: 2,
                title: "Complete KYC",
                description: "Verify your identity with our simple KYC process",
              },
              {
                step: 3,
                title: "Fund Your Wallet",
                description: "Add money through bank transfer or other methods",
              },
              {
                step: 4,
                title: "Start Using Services",
                description: "Save, borrow, or make transactions instantly",
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="relative mb-8">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-xl">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-slate-200 -z-10 transform -translate-x-10">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="text-slate-400" size={20} />
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">Ready to Start Your Financial Journey?</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Join thousands of others who are taking control of their finances with WorkWealth
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 font-semibold px-10 py-4 text-lg shadow-xl">
                Create Your Account Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            <div>
              <Logo variant="full" size="md" className="text-white mb-6" />
              <p className="text-slate-400 leading-relaxed">
                WorkWealth is committed to providing accessible financial services to everyone across Africa.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Services</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">Smart Savings</li>
                <li className="hover:text-white transition-colors cursor-pointer">Quick Loans</li>
                <li className="hover:text-white transition-colors cursor-pointer">Secure Transactions</li>
                <li className="hover:text-white transition-colors cursor-pointer">Bill Payments</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white transition-colors">help@workwealth.com</li>
                <li className="hover:text-white transition-colors">+234 800 000 0000</li>
                <li className="hover:text-white transition-colors">Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">© {new Date().getFullYear()} WorkWealth. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
