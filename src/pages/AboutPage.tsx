
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Logo from "@/components/atoms/Logo";
import { Users, Award, TrendingUp } from "lucide-react";

const AboutPage = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About WorkWealth</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Financial solutions for the informal economy
              </p>
            </motion.div>
          </div>
        </div>
      </header>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                WorkWealth was founded in 2020 with a simple yet powerful mission: to bring accessible and affordable financial services to the millions of informal workers across Africa.
              </p>
              <p className="text-gray-600 mb-4">
                We recognized that traditional banking systems were failing to meet the needs of those in the informal sector – a sector that employs over 70% of Africa's workforce. This realization inspired us to create a solution tailored specifically for this underserved population.
              </p>
              <p className="text-gray-600">
                Today, WorkWealth serves over 10,000 users across Nigeria, providing essential financial services like savings, loans, and payments in a way that works for informal workers' unique needs and circumstances.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img 
                src="https://images.pexels.com/photos/7821738/pexels-photo-7821738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Team working together" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={32} className="text-ww-purple-500" />,
                title: "Inclusion",
                description: "We believe financial services should be accessible to everyone, regardless of their income level or employment status."
              },
              {
                icon: <Award size={32} className="text-ww-purple-500" />,
                title: "Integrity",
                description: "We operate with transparency and honesty in all our dealings, building trust with our users and partners."
              },
              {
                icon: <TrendingUp size={32} className="text-ww-purple-500" />,
                title: "Innovation",
                description: "We continuously seek new ways to improve our services and create solutions tailored to our users' evolving needs."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the people driving our mission forward
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Oluwaseun Adebayo",
                role: "CEO & Co-Founder",
                image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                bio: "Former FinTech executive with 12+ years of experience in financial inclusion initiatives across Africa."
              },
              {
                name: "Amara Okafor",
                role: "CTO & Co-Founder",
                image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                bio: "Tech innovator with expertise in building scalable financial platforms for emerging markets."
              },
              {
                name: "Emmanuel Mensah",
                role: "Chief Operating Officer",
                image: "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                bio: "Operations specialist with extensive experience in microfinance and community banking systems."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-ww-purple-500 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
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
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Be part of the financial revolution empowering Africa's informal sector
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-ww-purple-600 hover:bg-white/90 font-semibold">
                Sign Up Today
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

export default AboutPage;
