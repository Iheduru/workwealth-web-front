
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Logo from "@/components/atoms/Logo";
import { Shield, PiggyBank, CreditCard, Users, Check, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const [demoBalance, setDemoBalance] = useState(10000);
  const [showTransfer, setShowTransfer] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);
  
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-ww-purple-500 to-ww-purple-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Logo variant="full" size="md" className="text-white" />
            <div className="hidden md:flex gap-4">
              <Link to="/about">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                  About
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                  Features
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                  Contact
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-ww-purple-600">
                  Sign In
                </Button>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" className="text-white p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
            </div>
          </nav>
          
          <div className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Financial Solutions for <span className="text-yellow-300">Everyone</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-lg">
                Access savings, loans, and easy payments designed for informal workers across Africa. Build your financial future with WorkWealth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-ww-purple-600 hover:bg-white/90 font-semibold">
                    Get Started
                  </Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-semibold">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="bg-ww-purple-100 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-ww-purple-500 flex items-center justify-center text-white">
                    <Users size={20} />
                  </div>
                  <span className="ml-3 font-medium">WorkWealth Demo</span>
                </div>
                <Button variant="ghost" size="sm" onClick={resetDemo}>Reset</Button>
              </div>
              
              <div className="p-6 bg-white">
                <p className="text-sm text-muted-foreground mb-1">Wallet Balance</p>
                <p className="text-2xl font-bold">₦{demoBalance.toLocaleString()}</p>
                
                <div className="mt-6 space-y-4">
                  {!showTransfer ? (
                    <Button 
                      onClick={() => setShowTransfer(true)}
                      className="w-full"
                    >
                      Transfer Money
                    </Button>
                  ) : !transferComplete ? (
                    <div className="space-y-4">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                      <p className="text-sm text-center">Processing transfer...</p>
                    </div>
                  ) : (
                    <div className="border border-green-200 rounded-md p-4 bg-green-50">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                          <Check size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-green-700">Transfer Success!</p>
                          <p className="text-sm text-green-600">₦2,000 sent to Abayomi</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="bg-ww-purple-700 py-6">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-semibold text-3xl text-white">10K+</p>
              <p className="text-white/80">Active Users</p>
            </div>
            <div>
              <p className="font-semibold text-3xl text-white">₦50M+</p>
              <p className="text-white/80">Loan Disbursed</p>
            </div>
            <div>
              <p className="font-semibold text-3xl text-white">15+</p>
              <p className="text-white/80">Partner Banks</p>
            </div>
            <div>
              <p className="font-semibold text-3xl text-white">4.9/5</p>
              <p className="text-white/80">User Rating</p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive financial solutions tailored to your needs
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mb-4">
                    <PiggyBank size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Savings</h3>
                  <p className="text-gray-600">
                    Set savings goals, create automatic deposits, and watch your money grow with competitive interest rates.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Daily, weekly or monthly savings</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Target-based savings plans</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Group savings options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mb-4">
                    <CreditCard size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quick Loans</h3>
                  <p className="text-gray-600">
                    Access affordable credit when you need it most, with quick approvals and flexible repayment terms.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">No collateral required</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Approval in under 24 hours</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Competitive interest rates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mb-4">
                    <Shield size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                  <p className="text-gray-600">
                    Send and receive money instantly with bank-level security and minimal transaction fees.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Bank transfers</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Bill payments</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Airtime & data purchase</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with WorkWealth is quick and easy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-ww-purple-500 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -z-10 transform -translate-x-8">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="text-gray-300" />
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-ww-purple-600 to-ww-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Financial Journey?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of others who are taking control of their finances with WorkWealth
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-ww-purple-600 hover:bg-white/90 font-semibold">
                Create Your Account Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white/80 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo variant="full" size="md" className="text-white mb-4" />
              <p className="text-sm">
                WorkWealth is committed to providing accessible financial services to everyone across Africa.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>Smart Savings</li>
                <li>Quick Loans</li>
                <li>Secure Transactions</li>
                <li>Bill Payments</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li>Careers</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>help@workwealth.com</li>
                <li>+234 800 000 0000</li>
                <li>Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} WorkWealth. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm">Privacy Policy</a>
              <a href="#" className="text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
