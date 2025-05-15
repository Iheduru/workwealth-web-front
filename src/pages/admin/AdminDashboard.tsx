
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users, Banknote, CreditCard, Settings, User, FileText } from "lucide-react";

const AdminDashboard = () => {
  const { toast } = useToast();

  const handleAction = (actionName: string) => {
    toast({
      title: "Admin Action",
      description: `The "${actionName}" functionality would be implemented in production.`
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      <p className="text-muted-foreground">
        Manage the WorkWealth platform, users, and system configuration.
      </p>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,247</div>
            <p className="text-xs text-muted-foreground mt-1">
              +124 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground mt-1">
              +3 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">782</div>
            <p className="text-xs text-muted-foreground mt-1">
              ₦24.5M total value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦142.8M</div>
            <p className="text-xs text-muted-foreground mt-1">
              +₦8.3M this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Administrative Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleAction("Manage Users")}
            >
              <Users className="h-5 w-5 text-ww-purple-500" />
              <span>Manage Users</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleAction("Loan Approval")}
            >
              <CreditCard className="h-5 w-5 text-ww-purple-500" />
              <span>Loan Approvals</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleAction("Financial Reports")}
            >
              <FileText className="h-5 w-5 text-ww-purple-500" />
              <span>Financial Reports</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleAction("System Settings")}
            >
              <Settings className="h-5 w-5 text-ww-purple-500" />
              <span>System Settings</span>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {[
                { user: "Admin", action: "Approved loan request #12345", time: "10 minutes ago" },
                { user: "System", action: "Daily backup completed", time: "1 hour ago" },
                { user: "Admin", action: "Added new agent account", time: "2 hours ago" },
                { user: "Admin", action: "Updated system settings", time: "3 hours ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center p-4">
                  <div className="w-8 h-8 rounded-full bg-ww-purple-100 flex items-center justify-center mr-3 text-ww-purple-500">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      By {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Loan Applications Pending Review</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 py-3 px-4 font-medium text-sm bg-muted/50">
              <div className="col-span-3">User</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-3">Purpose</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Action</div>
            </div>
            
            <div className="divide-y">
              {[
                { user: "John Doe", amount: "₦50,000", purpose: "Business", date: "May 15, 2023" },
                { user: "Jane Smith", amount: "₦75,000", purpose: "Education", date: "May 14, 2023" },
                { user: "Samuel Johnson", amount: "₦35,000", purpose: "Medical", date: "May 14, 2023" },
              ].map((loan, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 py-3 px-4 hover:bg-muted/30 text-sm">
                  <div className="col-span-3 font-medium">{loan.user}</div>
                  <div className="col-span-2">{loan.amount}</div>
                  <div className="col-span-3">{loan.purpose}</div>
                  <div className="col-span-2 text-muted-foreground">{loan.date}</div>
                  <div className="col-span-2">
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 bg-ww-green-500 text-white border-ww-green-500 hover:bg-ww-green-600"
                        onClick={() => handleAction(`Approve loan for ${loan.user}`)}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline" 
                        className="h-8"
                        onClick={() => handleAction(`Reject loan for ${loan.user}`)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-muted-foreground text-sm p-6">
        <p>This is a placeholder for the Admin Dashboard interface.</p>
        <p>Additional features would be implemented in the production version.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
