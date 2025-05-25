
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WalletSummaryCard from "@/components/organisms/WalletSummaryCard";
import QuickActionsPanel from "@/components/organisms/QuickActionsPanel";
import BillPaymentPanel from "@/components/organisms/BillPaymentPanel";
import { ArrowUpRight, BarChart3, AlertTriangle, TrendingUp, Wallet, CreditCard } from "lucide-react";
import AlertBanner from "@/components/molecules/AlertBanner";
import { 
  getWalletBalance, 
  getRecentTransactions, 
  addDeposit, 
  addWithdrawal, 
  addTransfer,
  addBillPayment,
  Transaction
} from "@/services/transactionService";

// Import modals for bill payments
import AirtimeModal from "@/components/modals/AirtimeModal";
import DataBundleModal from "@/components/modals/DataBundleModal";
import TvSubscriptionModal from "@/components/modals/TvSubscriptionModal";
import ElectricityBillModal from "@/components/modals/ElectricityBillModal";
import NetflixSubscriptionModal from "@/components/modals/NetflixSubscriptionModal";
import TransactionDetailsModal from "@/components/modals/TransactionDetailsModal";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // State for wallet balance and transactions
  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastTransaction, setLastTransaction] = useState<{
    amount: string;
    date: string;
    type: "credit" | "debit";
  } | undefined>(undefined);
  
  const [loanDueDate] = useState("May 20, 2023");
  const [loanAmount] = useState("25,000");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  
  const [isAirtimeModalOpen, setIsAirtimeModalOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isTvModalOpen, setIsTvModalOpen] = useState(false);
  const [isElectricityModalOpen, setIsElectricityModalOpen] = useState(false);
  const [isNetflixModalOpen, setIsNetflixModalOpen] = useState(false);
  
  useEffect(() => {
    const currentBalance = getWalletBalance();
    setBalance(currentBalance);
    
    const recentTransactions = getRecentTransactions();
    setTransactions(recentTransactions);
    
    if (recentTransactions.length > 0) {
      const latest = recentTransactions[0];
      setLastTransaction({
        amount: latest.amount,
        date: latest.date,
        type: latest.type,
      });
    }
  }, []);
  
  const handleDeposit = (amount: number) => {
    try {
      const transaction = addDeposit(amount);
      setBalance(getWalletBalance());
      setTransactions([transaction, ...transactions].slice(0, 3));
      setLastTransaction({
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
      });
    } catch (error) {
      console.error("Deposit failed:", error);
    }
  };
  
  const handleWithdraw = (amount: number) => {
    try {
      const transaction = addWithdrawal(amount);
      setBalance(getWalletBalance());
      setTransactions([transaction, ...transactions].slice(0, 3));
      setLastTransaction({
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
      });
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
  };
  
  const handleTransfer = (amount: number, recipient: string) => {
    try {
      const transaction = addTransfer(amount, recipient);
      setBalance(getWalletBalance());
      setTransactions([transaction, ...transactions].slice(0, 3));
      setLastTransaction({
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
      });
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  };

  const handleBillPayment = (amount: number, description: string) => {
    try {
      const transaction = addBillPayment(amount, description);
      setBalance(getWalletBalance());
      setTransactions([transaction, ...transactions].slice(0, 3));
      setLastTransaction({
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
      });
    } catch (error) {
      console.error("Bill payment failed:", error);
    }
  };

  const handleAirtimePurchase = (amount: number, phoneNumber: string, network: string) => {
    handleBillPayment(amount, `${network.toUpperCase()} Airtime for ${phoneNumber}`);
  };

  const handleDataPurchase = (amount: number, phoneNumber: string, network: string, plan: string) => {
    handleBillPayment(amount, `${network.toUpperCase()} ${plan} for ${phoneNumber}`);
  };

  const handleTvSubscription = (amount: number, smartCardNumber: string, provider: string, plan: string) => {
    handleBillPayment(amount, `${provider.toUpperCase()} ${plan} for ${smartCardNumber}`);
  };

  const handleNetflixSubscription = (amount: number, email: string, plan: string) => {
    handleBillPayment(amount, `Netflix ${plan} Subscription for ${email}`);
  };

  const handleElectricityPayment = (amount: number, meterNumber: string, provider: string) => {
    handleBillPayment(amount, `${provider.toUpperCase()} Electricity for Meter ${meterNumber}`);
  };
  
  const handleBillSelect = (billType: string) => {
    switch (billType) {
      case "airtime":
        setIsAirtimeModalOpen(true);
        break;
      case "data":
        setIsDataModalOpen(true);
        break;
      case "cable":
        setIsTvModalOpen(true);
        break;
      case "netflix":
        setIsNetflixModalOpen(true);
        break;
      case "electricity":
        setIsElectricityModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleOpenTransactionDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Welcome back, Ade!
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Here's an overview of your financial activities and options.
          </p>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Wallet Summary */}
          <div className="lg:col-span-4">
            <WalletSummaryCard 
              balance={balance} 
              lastTransaction={lastTransaction}
              onAddFunds={() => setIsDepositModalOpen(true)}
              accountNumber="234 567 8910"
            />
          </div>
          
          {/* Loan Payment Card */}
          <div className="lg:col-span-8">
            <Card className="h-full bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <CreditCard className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900 dark:text-white">Upcoming Loan Payment</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Please ensure you have sufficient funds before the due date
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Due on {loanDueDate}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">NGN {loanAmount}</p>
                  </div>
                  <Button 
                    onClick={() => navigate("/loan")}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    View Loan Details
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Quick Actions */}
        <QuickActionsPanel 
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          onTransfer={handleTransfer}
          balance={parseInt(balance.replace(/,/g, ""), 10)}
        />
        
        {/* Bill Payment */}
        <BillPaymentPanel onSelectBillType={handleBillSelect} />
        
        {/* Alert Banner */}
        <AlertBanner
          type="warning"
          message="Complete your KYC verification to increase your transaction limits."
          onClose={() => {}}
        />
        
        {/* Bottom Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="xl:col-span-2">
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl text-slate-900 dark:text-white">Recent Transactions</CardTitle>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate("/transactions")}
                    className="bg-white/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600"
                  >
                    View All
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {transactions.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-all duration-200 group"
                      onClick={() => handleOpenTransactionDetails(transaction)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === "credit" 
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" 
                            : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                        }`}>
                          {transaction.type === "credit" ? (
                            <TrendingUp className="h-5 w-5" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 rotate-180" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${
                          transaction.type === "credit" 
                            ? "text-emerald-600 dark:text-emerald-400" 
                            : "text-red-600 dark:text-red-400"
                        }`}>
                          {transaction.type === "credit" ? "+" : "-"} NGN {transaction.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Savings & Notifications */}
          <div className="space-y-6">
            {/* Savings Progress */}
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Savings Progress</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium text-slate-700 dark:text-slate-300">House Fund</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">60%</span>
                    </div>
                    <div className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-full h-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Emergency Fund</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">25%</span>
                    </div>
                    <div className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-white/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 border-emerald-200 dark:border-emerald-700"
                  onClick={() => navigate("/savings")}
                >
                  Manage Savings Plans
                </Button>
              </CardContent>
            </Card>
            
            {/* Notifications */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Notifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-purple-500 bg-white/50 dark:bg-slate-800/50 pl-4 py-3 rounded-r-lg">
                  <p className="font-semibold text-slate-900 dark:text-white">Loan Reminder</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Your loan payment is due in 5 days</p>
                </div>
                
                <div className="border-l-4 border-emerald-500 bg-white/50 dark:bg-slate-800/50 pl-4 py-3 rounded-r-lg">
                  <p className="font-semibold text-slate-900 dark:text-white">Savings Goal Milestone</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">You've reached 60% of your House Fund target!</p>
                </div>
                
                <div className="border-l-4 border-blue-500 bg-white/50 dark:bg-slate-800/50 pl-4 py-3 rounded-r-lg">
                  <p className="font-semibold text-slate-900 dark:text-white">New Feature Available</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Try our new bill payment service</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bill Payment Modals */}
      <AirtimeModal
        isOpen={isAirtimeModalOpen}
        onClose={() => setIsAirtimeModalOpen(false)}
        onSuccess={handleAirtimePurchase}
        maxAmount={parseInt(balance.replace(/,/g, ""), 10)}
      />

      <DataBundleModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        onSuccess={handleDataPurchase}
        maxAmount={parseInt(balance.replace(/,/g, ""), 10)}
      />

      <TvSubscriptionModal
        isOpen={isTvModalOpen}
        onClose={() => setIsTvModalOpen(false)}
        onSuccess={handleTvSubscription}
        maxAmount={parseInt(balance.replace(/,/g, ""), 10)}
      />

      <NetflixSubscriptionModal
        isOpen={isNetflixModalOpen}
        onClose={() => setIsNetflixModalOpen(false)}
        onSuccess={handleNetflixSubscription}
        maxAmount={parseInt(balance.replace(/,/g, ""), 10)}
      />

      <ElectricityBillModal
        isOpen={isElectricityModalOpen}
        onClose={() => setIsElectricityModalOpen(false)}
        onSuccess={handleElectricityPayment}
        maxAmount={parseInt(balance.replace(/,/g, ""), 10)}
      />

      <TransactionDetailsModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Dashboard;
