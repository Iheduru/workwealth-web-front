
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Users, 
  CreditCard, 
  TrendingUp,
  ShieldCheck,
  Activity,
  Banknote,
  PieChart,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center mt-4 sm:mt-0 space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>
            <ShieldCheck className="mr-2 h-4 w-4" />
            System Settings
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,458</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-ww-green-500 font-medium">+2.5%</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Loans
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦24.5M</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-ww-green-500 font-medium">+4.1%</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Transactions
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦142.8M</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-ww-green-500 font-medium">+12.2%</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenue
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦8.7M</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-ww-green-500 font-medium">+7.3%</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded">
                  {/* Placeholder for transaction chart */}
                  <div className="text-center p-4">
                    <BarChart className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Transaction volume chart would display here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded">
                  {/* Placeholder for user pie chart */}
                  <div className="text-center p-4">
                    <PieChart className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      User distribution pie chart would display here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activities</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-4 p-2 hover:bg-muted/50 rounded">
                    <div className={`p-2 rounded-full 
                      ${["bg-blue-100", "bg-ww-green-100", "bg-amber-100", "bg-ww-purple-100", "bg-red-100"][i]}
                      ${["text-blue-600", "text-ww-green-600", "text-amber-600", "text-ww-purple-600", "text-red-600"][i]}
                    `}>
                      {[<CreditCard className="h-4 w-4" />, <Users className="h-4 w-4" />, <Banknote className="h-4 w-4" />, <TrendingUp className="h-4 w-4" />, <ShieldCheck className="h-4 w-4" />][i]}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">
                        {[
                          "New loan application received",
                          "25 new users registered",
                          "Large deposit detected (₦1.2M)",
                          "Monthly financial report generated",
                          "Security alert: multiple failed login attempts"
                        ][i]}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {["5 minutes ago", "1 hour ago", "3 hours ago", "5 hours ago", "1 day ago"][i]}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>Manage all customers and their accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Customer Management Dashboard</h3>
                <p className="text-muted-foreground">
                  This section would contain customer management tools, user listing, search filters, 
                  and account management options.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loans">
          <Card>
            <CardHeader>
              <CardTitle>Loan Management</CardTitle>
              <CardDescription>Manage all loan applications and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Loan Management Dashboard</h3>
                <p className="text-muted-foreground">
                  This section would contain loan applications, approval workflows, loan performance metrics,
                  and repayment tracking tools.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agents">
          <Card>
            <CardHeader>
              <CardTitle>Agent Management</CardTitle>
              <CardDescription>Manage all agents and their activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Agent Management Dashboard</h3>
                <p className="text-muted-foreground">
                  This section would contain agent registration, performance tracking, commission management,
                  and territory assignment tools.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>View and generate financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <BarChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Financial Reporting Dashboard</h3>
                <p className="text-muted-foreground">
                  This section would contain revenue reports, transaction analyses, loan performance metrics,
                  and other financial reporting tools.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
