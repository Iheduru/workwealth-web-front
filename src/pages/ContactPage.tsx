
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Logo from "@/components/atoms/Logo";
import { MapPin, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1000);
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </div>
      </header>
      
      {/* Contact Form and Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Our team is here to help you with any questions about our services. Feel free to reach out through any of the following channels.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      123 Innovation Hub<br />
                      Lagos Island<br />
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">
                      Customer Support: +234 800 000 0000<br />
                      Business Inquiries: +234 800 111 1111
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <p className="text-gray-600">
                      Customer Support: help@workwealth.com<br />
                      Business Inquiries: business@workwealth.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mr-4">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Live Chat</h3>
                    <p className="text-gray-600">
                      Available Monday to Friday<br />
                      9:00 AM - 5:00 PM (WAT)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                    <p className="text-gray-600 text-center">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Your Name
                        </label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                          Subject
                        </label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          value={formData.subject}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Your Message
                        </label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Find Us</h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-lg overflow-hidden shadow-lg h-[400px]"
          >
            {/* Sample map image - in a real app, you'd use an actual map integration */}
            <img 
              src="https://images.pexels.com/photos/947486/pexels-photo-947486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Map location" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "What are your customer service hours?",
                answer: "Our customer service team is available Monday to Friday from 9:00 AM to 5:00 PM (WAT). For urgent issues, you can reach our 24/7 emergency support line."
              },
              {
                question: "How long does it take to get a response?",
                answer: "We aim to respond to all inquiries within 24 hours during business days. For complex issues, it might take up to 48 hours to provide a complete resolution."
              },
              {
                question: "Do you have physical branches?",
                answer: "Yes, we have physical branches in major cities across Nigeria. You can find the nearest branch using the 'Locate Us' feature in our mobile app."
              },
              {
                question: "How can I report a technical issue?",
                answer: "You can report technical issues through our in-app support feature, by emailing support@workwealth.com, or by calling our technical support line at +234 800 222 2222."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="mb-6 border-b border-gray-200 pb-6 last:border-b-0"
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
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

export default ContactPage;
