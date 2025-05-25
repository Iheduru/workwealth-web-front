import React, { useState, useEffect } from "react";
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
import { CreditCard, Calendar, DollarSign, Clock, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  duration: number;
  rejectionReason?: string;
}

const LoanHistory = () => {
  const [filter, setFilter] = useState("all");
  const [loanHistory, setLoanHistory] = useState<LoanRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoans = localStorage.getItem('loan-applications');
    if (storedLoans) {
      setLoanHistory(JSON.parse(storedLoans));
    } else {
      const defaultLoans: LoanRecord[] = [
        {
          id: "LN001",
          amount: 200000,
          purpose: "business",
          status: "completed",
          appliedDate: "2024-01-15",
          approvedDate: "2024-01-20",
          dueDate: "2024-07-20",
          interestRate: 5,
          monthlyPayment: 35000,
          remainingBalance: 0,
          duration: 6
        }
      ];
      setLoanHistory(defaultLoans);
    }
  }, []);

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

  const formatPurpose = (purpose: string) => {
    const purposeMap: { [key: string]: string } = {
      business: "Business",
      education: "Education", 
      medical: "Medical Expenses",
      house_rent: "House Rent",
      personal: "Personal",
      other: "Other"
    };
    return purposeMap[purpose] || purpose;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-100 dark:to-white bg-clip-text text-transparent">
              Loan History
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Track all your loan applications and active loans</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
                <SelectItem value="all">All Loans</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={() => navigate('/loan')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply for New Loan
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredLoans.length > 0 ? (
            filteredLoans.map((loan) => (
              <Card key={loan.id} className="group backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg mr-3">
                          <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{formatPurpose(loan.purpose)}</h3>
                        <Badge 
                          variant="secondary" 
                          className={`ml-3 ${getStatusColor(loan.status)} border-0 shadow-sm`}
                        >
                          <span className="flex items-center">
                            {getStatusIcon(loan.status)}
                            <span className="ml-1 capitalize font-medium">{loan.status}</span>
                          </span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loan Amount</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(loan.amount)}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Interest Rate</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">{loan.interestRate}% monthly</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Applied Date</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">{new Date(loan.appliedDate).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loan ID</p>
                          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{loan.id}</p>
                        </div>
                      </div>

                      {/* Status-specific content remains the same */}
                      {loan.status === "rejected" && loan.rejectionReason && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border border-red-200 dark:border-red-800">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-red-800 dark:text-red-200">Rejection Reason:</p>
                              <p className="text-sm text-red-700 dark:text-red-300 mt-1">{loan.rejectionReason}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {loan.status === "active" && (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Monthly Payment</p>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatCurrency(loan.monthlyPayment!)}</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Remaining Balance</p>
                            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{formatCurrency(loan.remainingBalance!)}</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Due Date</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{new Date(loan.dueDate!).toLocaleDateString()}</p>
                          </div>
                        </div>
                      )}

                      {loan.status === "approved" && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-green-800 dark:text-green-200">Loan Approved!</p>
                              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                Your loan has been approved. Funds will be disbursed shortly.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {loan.status === "completed" && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Loan Completed</p>
                              <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                                This loan has been fully repaid. Thank you for your business!
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 lg:mt-0 lg:ml-6">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all duration-200"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No loans found</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {filter !== "all" 
                    ? `You don't have any ${filter} loans`
                    : "You haven't applied for any loans yet"}
                </p>
                <Button 
                  onClick={() => navigate('/loan')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Apply for a Loan
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanHistory;
