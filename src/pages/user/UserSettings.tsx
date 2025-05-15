
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import InputWithIcon from "@/components/molecules/InputWithIcon";
import { Formik, Form, Field } from "formik";
import { User, Mail, Phone, Lock, Bell, EyeOff, Eye } from "lucide-react";

const UserSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleProfileSubmit = (values: any) => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated.",
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const handlePasswordSubmit = (values: any) => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={{
                  firstName: "Ade",
                  lastName: "Dayo",
                  email: "ade.dayo@example.com",
                  phone: "08012345678",
                }}
                onSubmit={handleProfileSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    <div className="flex mb-6 items-center">
                      <div className="h-20 w-20 rounded-full bg-ww-purple-200 flex items-center justify-center text-ww-purple-800 text-xl font-medium">
                        AD
                      </div>
                      <div className="ml-4">
                        <Button variant="outline" size="sm" className="mb-1">
                          Upload Photo
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          JPG or PNG. Max size of 2MB
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Field name="firstName">
                          {({ field }: { field: any }) => (
                            <InputWithIcon
                              {...field}
                              id="firstName"
                              icon={<User size={18} />}
                            />
                          )}
                        </Field>
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Field name="lastName">
                          {({ field }: { field: any }) => (
                            <InputWithIcon
                              {...field}
                              id="lastName"
                              icon={<User size={18} />}
                            />
                          )}
                        </Field>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Field name="email">
                        {({ field }: { field: any }) => (
                          <InputWithIcon
                            {...field}
                            id="email"
                            icon={<Mail size={18} />}
                            disabled
                          />
                        )}
                      </Field>
                      <p className="text-xs text-muted-foreground mt-1">
                        Contact support to change your email address
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Field name="phone">
                        {({ field }: { field: any }) => (
                          <InputWithIcon
                            {...field}
                            id="phone"
                            icon={<Phone size={18} />}
                          />
                        )}
                      </Field>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="bg-ww-purple-500 hover:bg-ww-purple-600"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                onSubmit={handlePasswordSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Field name="currentPassword">
                          {({ field }: { field: any }) => (
                            <InputWithIcon
                              {...field}
                              id="currentPassword"
                              type={showPassword ? "text" : "password"}
                              icon={<Lock size={18} />}
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
                    </div>

                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Field name="newPassword">
                          {({ field }: { field: any }) => (
                            <InputWithIcon
                              {...field}
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              icon={<Lock size={18} />}
                            />
                          )}
                        </Field>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-0 right-0 h-full px-3"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Password must be at least 8 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Field name="confirmPassword">
                        {({ field }: { field: any }) => (
                          <InputWithIcon
                            {...field}
                            id="confirmPassword"
                            type={showNewPassword ? "text" : "password"}
                            icon={<Lock size={18} />}
                          />
                        )}
                      </Field>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="bg-ww-purple-500 hover:bg-ww-purple-600"
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Update Password"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive OTP via SMS for secure login
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Login Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone logs into your account
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Transaction PIN</h4>
                    <p className="text-sm text-muted-foreground">
                      Require PIN for all transactions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Transaction Alerts</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts for all transactions
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Loan Reminders</h4>
                        <p className="text-sm text-muted-foreground">
                          Upcoming loan payment reminders
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Savings Goals</h4>
                        <p className="text-sm text-muted-foreground">
                          Updates about your savings goals progress
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Monthly Statements</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive monthly account statements via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Promotional News</h4>
                        <p className="text-sm text-muted-foreground">
                          Updates about new features and offers
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">SMS Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Transaction Alerts</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive SMS for transactions over ₦10,000
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Security Alerts</h4>
                        <p className="text-sm text-muted-foreground">
                          Important security notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  className="bg-ww-purple-500 hover:bg-ww-purple-600"
                  onClick={() => {
                    toast({
                      title: "Notification settings saved",
                      description: "Your notification preferences have been updated.",
                    });
                  }}
                >
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSettings;
