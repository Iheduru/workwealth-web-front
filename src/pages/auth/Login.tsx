
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import InputWithIcon from "@/components/molecules/InputWithIcon";
import { AtSign, Smartphone, Lock, Eye, EyeOff } from "lucide-react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const loginSchema = yup.object().shape({
  emailOrPhone: yup.string().required("Email or phone number is required"),
  password: yup.string().required("Password is required"),
});

const otpSchema = yup.object().shape({
  phone: yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must only contain digits"),
});

const Login = () => {
  const { toast } = useToast();
  const { login, loginWithOtp, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [sentOtp, setSentOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [phone, setPhone] = useState("");

  const handleLoginSubmit = async (values: { emailOrPhone: string; password: string }) => {
    try {
      await login(values.emailOrPhone, values.password);
    } catch (error) {
      // Error is handled in the auth context
      console.error(error);
    }
  };

  const handleSendOtp = async (values: { phone: string }) => {
    try {
      // Mock OTP sending
      setPhone(values.phone);
      toast({
        title: "OTP Sent",
        description: `We've sent a verification code to ${values.phone}`
      });
      setSentOtp(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send OTP",
        description: "Please try again later."
      });
      console.error(error);
    }
  };

  const handleOtpVerify = async () => {
    const otpValue = otp.join("");
    
    if (otpValue.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await loginWithOtp(phone, otpValue);
    } catch (error) {
      // Error is handled in the auth context
      console.error(error);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground mt-1">Sign in to your account</p>
      </div>
      
      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="otp">OTP</TabsTrigger>
        </TabsList>
        
        <TabsContent value="password">
          <Formik
            initialValues={{ emailOrPhone: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    as={InputWithIcon}
                    id="emailOrPhone"
                    name="emailOrPhone"
                    type="text"
                    placeholder="Email or phone number"
                    icon={<AtSign size={18} />}
                    error={touched.emailOrPhone && errors.emailOrPhone}
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <Field name="password">
                    {({ field }: { field: any }) => (
                      <div className="relative">
                        <InputWithIcon
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          icon={<Lock size={18} />}
                          error={touched.password && errors.password}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-0 right-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                      </div>
                    )}
                  </Field>
                </div>
                
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-ww-purple-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                
                <Button type="submit" className="w-full bg-ww-purple-500 hover:bg-ww-purple-600" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </Form>
            )}
          </Formik>
        </TabsContent>
        
        <TabsContent value="otp">
          {!sentOtp ? (
            <Formik
              initialValues={{ phone: "" }}
              validationSchema={otpSchema}
              onSubmit={handleSendOtp}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div>
                    <Field
                      as={InputWithIcon}
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Phone number"
                      icon={<Smartphone size={18} />}
                      error={touched.phone && errors.phone}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-ww-purple-500 hover:bg-ww-purple-600" disabled={isLoading}>
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Enter the 4-digit code sent to your phone
                </p>
              </div>
              
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-lg"
                    maxLength={1}
                  />
                ))}
              </div>
              
              <Button 
                type="button" 
                className="w-full bg-ww-purple-500 hover:bg-ww-purple-600" 
                disabled={isLoading}
                onClick={handleOtpVerify}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
              
              <div className="text-center">
                <Button 
                  variant="link" 
                  className="text-sm text-ww-purple-500"
                  onClick={() => setSentOtp(false)}
                  disabled={isLoading}
                >
                  Change phone number
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-ww-purple-500 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
