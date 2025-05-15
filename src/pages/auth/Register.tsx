
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import InputWithIcon from "@/components/molecules/InputWithIcon";
import FormLabel from "@/components/atoms/FormLabel";
import { User, At, Smartphone, Lock, Eye, EyeOff } from "lucide-react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must only contain digits"),
  password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  acceptTerms: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    acceptTerms: boolean;
  }) => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      // Store mock auth token
      localStorage.setItem("ww-auth-token", "mock-token-xyz");
      localStorage.setItem("ww-user-role", "user");
      
      toast({
        title: "Account created!",
        description: "Your registration was successful."
      });
      
      navigate("/kyc");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground mt-1">Join WorkWealth to start your financial journey</p>
      </div>
      
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          acceptTerms: false
        }}
        validationSchema={registerSchema}
        onSubmit={handleRegisterSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FormLabel htmlFor="firstName" required>First Name</FormLabel>
                <Field
                  as={InputWithIcon}
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  icon={<User size={18} />}
                  error={touched.firstName && errors.firstName}
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <FormLabel htmlFor="lastName" required>Last Name</FormLabel>
                <Field
                  as={InputWithIcon}
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  icon={<User size={18} />}
                  error={touched.lastName && errors.lastName}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <FormLabel htmlFor="email" required>Email</FormLabel>
              <Field
                as={InputWithIcon}
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                icon={<At size={18} />}
                error={touched.email && errors.email}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <FormLabel htmlFor="phone" required>Phone Number</FormLabel>
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
            
            <div>
              <FormLabel htmlFor="password" required>Password</FormLabel>
              <div className="relative">
                <Field name="password">
                  {({ field }: { field: any }) => (
                    <InputWithIcon
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      icon={<Lock size={18} />}
                      error={touched.password && errors.password}
                      disabled={isLoading}
                    />
                  )}
                </Field>
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
              <p className="text-xs text-muted-foreground mt-1">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={values.acceptTerms}
                onCheckedChange={(checked) => 
                  setFieldValue("acceptTerms", checked === true)
                }
              />
              <label
                htmlFor="acceptTerms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <a href="#" className="text-ww-purple-500 hover:underline">
                  terms and conditions
                </a>
                {touched.acceptTerms && errors.acceptTerms && (
                  <p className="text-xs text-red-500 mt-1">{errors.acceptTerms}</p>
                )}
              </label>
            </div>
            
            <Button type="submit" className="w-full bg-ww-purple-500 hover:bg-ww-purple-600" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </Form>
        )}
      </Formik>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-ww-purple-500 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
