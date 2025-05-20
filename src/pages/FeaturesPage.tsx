
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Logo from "@/components/atoms/Logo";
import { 
  PiggyBank, 
  CreditCard, 
  Shield, 
  Smartphone, 
  BarChart, 
  Users, 
  Bell,
  CheckCircle
} from "lucide-react";

const FeaturesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
      {/* Header */}
      <header className="bg-gradient-to-r from-ww-purple-500 to-ww-purple-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link to="/">
              <Logo variant="full" size="md" className="text-white" />
            </Link>
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
          
          <div className="py-16 text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Features</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Comprehensive financial tools designed for everyday needs
              </p>
            </motion.div>
          </div>
        </div>
      </header>
      
      {/* Core Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Essential financial services to meet your daily needs
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-white shadow-lg border border-gray-100">
              <div className="h-16 w-16 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mb-4">
                <PiggyBank size={30} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Savings</h3>
              <p className="text-gray-600 mb-4">
                Create savings plans that match your income patterns and financial goals. Save daily, weekly, or monthly.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-600">Automatic savings plans</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-600">Goal-based savings</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-600">Competitive interest rates</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-white shadow-lg border border-gray-100">
              <div className="h-16 w-16 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mb-4">
                <CreditCard size={30} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accessible Loans</h3>
              <p className="text-gray-600 mb-4">
                Get quick access to credit when you need it most, with fair interest rates and flexible repayment options.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-600">No collateral required</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-600">Quick approval process</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-600">Flexible payment schedules</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-white shadow-lg border border-gray-100">
              <div className="h-16 w-16 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mb-4">
                <Shield size={30} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
              <p className="text-gray-600 mb-4">
                Send and receive money safely with minimal fees. Pay bills and make purchases directly from your WorkWealth account.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-600">Bank transfers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-600">Bill payments</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-600">Merchant payments</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Mobile App Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl font-bold mb-6">Mobile App Features</h2>
              <p className="text-gray-600 mb-6">
                Access all WorkWealth services from your phone, anytime and anywhere. Our mobile app is designed to be intuitive and work even in areas with limited connectivity.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    icon: <Smartphone className="text-ww-purple-500" />,
                    title: "Offline Capability",
                    description: "Continue using core features even when internet connectivity is limited."
                  },
                  {
                    icon: <Bell className="text-ww-purple-500" />,
                    title: "Transaction Notifications",
                    description: "Receive instant alerts for all account activities to stay informed."
                  },
                  {
                    icon: <BarChart className="text-ww-purple-500" />,
                    title: "Financial Insights",
                    description: "Track your spending patterns and savings progress with visual reports."
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="flex items-start"
                  >
                    <div className="mt-1 mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button className="bg-ww-purple-500 hover:bg-ww-purple-600">
                  Download Our App
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-64 h-[500px] bg-black rounded-[36px] p-4 overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-xl"></div>
                <div className="w-full h-full bg-ww-purple-100 rounded-[24px] overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/8853537/pexels-photo-8853537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Mobile app interface" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Group Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Group savings" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Group Financial Tools</h2>
              <p className="text-gray-600 mb-6">
                WorkWealth enables communities to save and grow together with our powerful group features.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Group Savings</h3>
                  <p className="text-gray-600">
                    Create and manage savings groups with friends, family, or colleagues. Set group goals and track progress together.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Rotating Savings</h3>
                  <p className="text-gray-600">
                    Organize digital rotating savings groups (also known as susu or esusu) where members contribute regularly and take turns receiving the collected sum.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Projects</h3>
                  <p className="text-gray-600">
                    Fund community initiatives together and track contributions transparently.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/register">
                  <Button>Start a Group Today</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Feature Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Compare</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how WorkWealth stacks up against traditional banking options
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[768px] bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-ww-purple-500 text-white">
                  <th className="py-4 px-6 text-left">Feature</th>
                  <th className="py-4 px-6 text-center">WorkWealth</th>
                  <th className="py-4 px-6 text-center">Traditional Banks</th>
                  <th className="py-4 px-6 text-center">Mobile Money</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Account Opening Requirements",
                    workwealth: "Basic KYC, No Minimum Balance",
                    traditional: "Extensive Documentation, Minimum Balance",
                    mobile: "Basic KYC, Some Require Minimum Balance"
                  },
                  {
                    feature: "Transaction Fees",
                    workwealth: "Minimal to None",
                    traditional: "High",
                    mobile: "Medium"
                  },
                  {
                    feature: "Loan Application Process",
                    workwealth: "Quick & Simple, 24hr Approval",
                    traditional: "Complex, Days/Weeks",
                    mobile: "Limited Options"
                  },
                  {
                    feature: "Savings Interest Rates",
                    workwealth: "Competitive",
                    traditional: "Low",
                    mobile: "Very Low/None"
                  },
                  {
                    feature: "Group Financial Tools",
                    workwealth: "Comprehensive",
                    traditional: "Limited",
                    mobile: "Basic or None"
                  }
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="py-4 px-6 border-b font-medium">{row.feature}</td>
                    <td className="py-4 px-6 border-b text-center">
                      <span className="flex items-center justify-center">
                        <CheckCircle size={18} className="text-green-500 mr-2" />
                        {row.workwealth}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b text-center text-gray-600">{row.traditional}</td>
                    <td className="py-4 px-6 border-b text-center text-gray-600">{row.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Experience These Features?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of users already benefiting from WorkWealth's innovative financial tools
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-ww-purple-600 hover:bg-white/90 font-semibold">
                Create Your Free Account
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

export default FeaturesPage;
