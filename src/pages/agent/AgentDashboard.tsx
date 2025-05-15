
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, DollarSign, CreditCard, UserPlus, Users } from "lucide-react";

const AgentDashboard = () => {
  const { toast } = useToast();

  const handleAction = (actionName: string) => {
    toast({
      title: "Agent Action",
      description: `The "${actionName}" functionality would be implemented in production.`
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Agent Dashboard</h2>
      <p className="text-muted-foreground">
        Manage customer accounts, process transactions, and track performance.
      </p>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,024</div>
            <p className="text-xs text-muted-foreground mt-1">
              +85 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active loans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Commission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦25,400</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleAction("Register New Customer")}
            >
              <UserPlus className="h-5 w-5 text-ww-purple-500" />
              <span>Register Customer</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleAction("Process Deposit")}
            >
              <DollarSign className="h-5 w-5 text-ww-purple-500" />
              <span>Process Deposit</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleAction("Process Withdrawal")}
            >
              <CreditCard className="h-5 w-5 text-ww-purple-500" />
              <span>Process Withdrawal</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleAction("Customer Support")}
            >
              <User className="h-5 w-5 text-ww-purple-500" />
              <span>Customer Support</span>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {["Tola Adebayo", "Sarah Johnson", "Emmanuel Okon", "Grace Adeyemi"].map((name, i) => (
                <div key={i} className="flex items-center p-4">
                  <div className="w-8 h-8 rounded-full bg-ww-purple-100 flex items-center justify-center mr-3 text-ww-purple-500 font-medium">
                    {name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">
                      Registered {["today", "yesterday", "2 days ago", "3 days ago"][i]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center text-muted-foreground text-sm p-6">
        <p>This is a placeholder for the Agent Dashboard interface.</p>
        <p>Additional features would be implemented in the production version.</p>
      </div>
    </div>
  );
};

export default AgentDashboard;
