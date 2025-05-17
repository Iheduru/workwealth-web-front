
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  UserPlus, 
  Users, 
  CreditCard, 
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const AgentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Agent Dashboard</h2>
      <p className="text-muted-foreground">
        Welcome back, Agent. Here's an overview of your activities and customers.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              +12 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦2.4M</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Commission Earned
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦52,400</div>
            <p className="text-xs text-muted-foreground">
              +₦6,500 since last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Customers</CardTitle>
              <Button variant="outline" size="sm">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-muted mr-3 flex items-center justify-center">
                      {["AO", "TD", "MK", "FJ", "BC"][i]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {["Akin Owolabi", "Tola David", "Musa Kabir", "Funke James", "Blessing Chukwu"][i]}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Registered {["2 days ago", "1 week ago", "2 weeks ago", "1 month ago", "3 months ago"][i]}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Performance Stats</CardTitle>
            <CardDescription>
              Your monthly performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Customer Acquisition</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-ww-purple-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Transaction Volume</span>
                  <span className="font-medium">64%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-ww-green-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Commission Target</span>
                  <span className="font-medium">52%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "52%" }}></div>
                </div>
              </div>
            </div>
            
            <Button className="mt-6 w-full">
              <BarChart className="h-4 w-4 mr-2" />
              View Detailed Reports
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common agent operations
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button variant="outline" className="h-24 flex flex-col">
            <UserPlus className="h-5 w-5 mb-2" />
            <span>Register Customer</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col">
            <CreditCard className="h-5 w-5 mb-2" />
            <span>Process Deposit</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col">
            <Users className="h-5 w-5 mb-2" />
            <span>Customer Support</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col">
            <BarChart className="h-5 w-5 mb-2" />
            <span>View Reports</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;
