
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Calendar, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface LoanRecord {
  id: string;
  amount: number;
  purpose: string;
  status: "pending" | "approved" | "rejected" | "active" | "completed";
  appliedDate: string;
  approvedDate?: string;
  dueDate?: string;
  interestRate: number;
  monthlyPayment?: number;
  remainingBalance?: number;
}

const LoanHistory = () => {
  const [filter, setFilter] = useState("all");

  // Mock loan data - in a real app, this would come from an API
  const loanHistory: LoanRecord[] = [
    {
      id: "LN001",
      amount: 500000,
      purpose: "Business Expansion",
      status: "active",
      appliedDate: "2024-01-15",
      approvedDate: "2024-01-20",
      dueDate: "2024-07-20",
      interestRate: 12,
      monthlyPayment: 87500,
      remainingBalance: 350000
    },
    {
      id: "LN002",
      amount: 200000,
      purpose: "Emergency Medical",
      status: "completed",
      appliedDate: "2023-08-10",
      approvedDate: "2023-08-12",
      dueDate: "2024-02-12",
      interestRate: 10,
      monthlyPayment: 35000,
      remainingBalance: 0
    },
    {
      id: "LN003",
      amount: 100000,
      purpose: "Education",
      status: "pending",
      appliedDate: "2024-05-01",
      interestRate: 8
    },
    {
      id: "LN004",
      amount: 300000,
      purpose: "Home Improvement",
      status: "rejected",
      appliedDate: "2024-03-15",
      interestRate: 11
    }
  ];

  const filteredLoans = loanHistory.filter(loan => {
    if (filter === "all") return true;
    return loan.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "active":
        return <CheckCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Loan History</h2>
          <p className="text-muted-foreground">
            Track all your loan applications and active loans
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Loans</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredLoans.length > 0 ? (
          filteredLoans.map((loan) => (
            <Card key={loan.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <CreditCard className="h-5 w-5 mr-2 text-ww-purple-500" />
                      <h3 className="text-lg font-semibold">{loan.purpose}</h3>
                      <Badge 
                        variant="secondary" 
                        className={`ml-2 ${getStatusColor(loan.status)}`}
                      >
                        <span className="flex items-center">
                          {getStatusIcon(loan.status)}
                          <span className="ml-1 capitalize">{loan.status}</span>
                        </span>
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Loan Amount</p>
                        <p className="font-semibold">{formatCurrency(loan.amount)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="font-semibold">{loan.interestRate}% p.a.</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Applied Date</p>
                        <p className="font-semibold">{new Date(loan.appliedDate).toLocaleDateString()}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Loan ID</p>
                        <p className="font-semibold text-ww-purple-600">{loan.id}</p>
                      </div>
                    </div>

                    {loan.status === "active" && (
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Payment</p>
                          <p className="font-semibold text-blue-600">{formatCurrency(loan.monthlyPayment!)}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Remaining Balance</p>
                          <p className="font-semibold text-orange-600">{formatCurrency(loan.remainingBalance!)}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Due Date</p>
                          <p className="font-semibold">{new Date(loan.dueDate!).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <CreditCard className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-4 text-lg font-medium">No loans found</p>
              <p className="text-muted-foreground">
                {filter !== "all" 
                  ? `You don't have any ${filter} loans`
                  : "You haven't applied for any loans yet"}
              </p>
              <Button className="mt-4" onClick={() => window.location.href = "/loan"}>
                Apply for a Loan
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LoanHistory;
