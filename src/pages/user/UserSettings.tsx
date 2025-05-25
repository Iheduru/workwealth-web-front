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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your profile, security, and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Profile</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Security</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
              <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
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
                    <Form className="space-y-6">
                      <div className="flex mb-8 items-center">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          AD
                        </div>
                        <div className="ml-6">
                          <Button variant="outline" size="sm" className="mb-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                            Upload Photo
                          </Button>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            JPG or PNG. Max size of 2MB
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-semibold text-slate-700 dark:text-slate-300">First Name</Label>
                          <Field name="firstName">
                            {({ field }: { field: any }) => (
                              <InputWithIcon
                                {...field}
                                id="firstName"
                                icon={<User size={18} />}
                                className="mt-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                              />
                            )}
                          </Field>
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Name</Label>
                          <Field name="lastName">
                            {({ field }: { field: any }) => (
                              <InputWithIcon
                                {...field}
                                id="lastName"
                                icon={<User size={18} />}
                                className="mt-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                              />
                            )}
                          </Field>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</Label>
                        <Field name="email">
                          {({ field }: { field: any }) => (
                            <InputWithIcon
                              {...field}
                              id="email"
                              icon={<Mail size={18} />}
                              disabled
                              className="mt-2 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                            />
                          )}
                        </Field>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          Contact support to change your email address
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</Label>
                        <Field name="phone">
                          {({ field }: { field: any }) => (
                            <InputWithIcon
                              {...field}
                              id="phone"
                              icon={<Phone size={18} />}
                              className="mt-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                            />
                          )}
                        </Field>
                      </div>

                      <div className="pt-6">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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

          <TabsContent value="security" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
              <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">Change Password</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Formik
                  initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  onSubmit={handlePasswordSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="space-y-6">
                      <div>
                        <Label htmlFor="currentPassword" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Current Password</Label>
                        <div className="relative mt-2">
                          <Field name="currentPassword">
                            {({ field }: { field: any }) => (
                              <InputWithIcon
                                {...field}
                                id="currentPassword"
                                type={showPassword ? "text" : "password"}
                                icon={<Lock size={18} />}
                                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 pr-12"
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
                        <Label htmlFor="newPassword" className="text-sm font-semibold text-slate-700 dark:text-slate-300">New Password</Label>
                        <div className="relative mt-2">
                          <Field name="newPassword">
                            {({ field }: { field: any }) => (
                              <InputWithIcon
                                {...field}
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                icon={<Lock size={18} />}
                                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 pr-12"
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
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          Password must be at least 8 characters
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm New Password</Label>
                        <Field name="confirmPassword">
                          {({ field }: { field: any }) => (
                            <InputWithIcon
                              {...field}
                              id="confirmPassword"
                              type={showNewPassword ? "text" : "password"}
                              icon={<Lock size={18} />}
                              className="mt-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                            />
                          )}
                        </Field>
                      </div>

                      <div className="pt-6">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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

            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
              <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">SMS Authentication</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Receive OTP via SMS for secure login
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Login Notifications</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Get notified when someone logs into your account
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Transaction PIN</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Require PIN for all transactions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
              <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Transaction Alerts</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Receive alerts for all transactions
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Loan Reminders</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Upcoming loan payment reminders
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Savings Goals</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Updates about your savings goals progress
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Monthly Statements</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Receive monthly account statements via email
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Promotional News</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Updates about new features and offers
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">SMS Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Payment Confirmations</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            SMS confirmation for payments and transfers
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Security Alerts</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Critical security notifications via SMS
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserSettings;
