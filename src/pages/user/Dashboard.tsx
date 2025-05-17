import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WalletSummaryCard from "@/components/organisms/WalletSummaryCard";
import QuickActionsPanel from "@/components/organisms/QuickActionsPanel";
import BillPaymentPanel from "@/components/organisms/BillPaymentPanel";
import { ArrowUpRight, BarChart3, AlertTriangle } from "lucide-react";
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
  
  // Other state
  const [loanDueDate] = useState("May 20, 2023");
  const [loanAmount] = useState("25,000");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  
  // Transaction details modal state
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  
  // Bill payment modal states
  const [isAirtimeModalOpen, setIsAirtimeModalOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isTvModalOpen, setIsTvModalOpen] = useState(false);
  const [isElectricityModalOpen, setIsElectricityModalOpen] = useState(false);
  const [isNetflixModalOpen, setIsNetflixModalOpen] = useState(false);
  
  // Initialize data
  useEffect(() => {
    // Get initial balance
    const currentBalance = getWalletBalance();
    setBalance(currentBalance);
    
    // Get recent transactions
    const recentTransactions = getRecentTransactions();
    setTransactions(recentTransactions);
    
    // Set last transaction if available
    if (recentTransactions.length > 0) {
      const latest = recentTransactions[0];
      setLastTransaction({
        amount: latest.amount,
        date: latest.date,
        type: latest.type,
      });
    }
  }, []);
  
  // Handle deposit
  const handleDeposit = (amount: number) => {
    try {
      const transaction = addDeposit(amount);
      
      // Update balance
      setBalance(getWalletBalance());
      
      // Update transactions list
      setTransactions([transaction, ...transactions].slice(0, 3));
      
      // Update last transaction
      setLastTransaction({
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
      });
    } catch (error) {
      console.error("Deposit failed:", error);
    }
  };
  
  // Handle withdrawal
  const handleWithdraw = (amount: number) => {
    try {
      const transaction = addWithdrawal(amount);
      
      // Update balance
      setBalance(getWalletBalance());
      
      // Update transactions list
      setTransactions([transaction, ...transactions].slice(0, 3));
      
      // Update last transaction
      setLastTransaction({
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
      });
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
  };
  
  // Handle transfer
  const handleTransfer = (amount: number, recipient: string) => {
    try {
      const transaction = addTransfer(amount, recipient);
      
      // Update balance
      setBalance(getWalletBalance());
      
      // Update transactions list
      setTransactions([transaction, ...transactions].slice(0, 3));
      
      // Update last transaction
      setLastTransaction({
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
      });
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  };

  // Handle bill payment
  const handleBillPayment = (amount: number, description: string) => {
    try {
      const transaction = addBillPayment(amount, description);
      
      // Update balance
      setBalance(getWalletBalance());
      
      // Update transactions list
      setTransactions([transaction, ...transactions].slice(0, 3));
      
      // Update last transaction
      setLastTransaction({
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
      });
    } catch (error) {
      console.error("Bill payment failed:", error);
    }
  };

  // Handle airtime purchase
  const handleAirtimePurchase = (amount: number, phoneNumber: string, network: string) => {
    handleBillPayment(amount, `${network.toUpperCase()} Airtime for ${phoneNumber}`);
  };

  // Handle data purchase
  const handleDataPurchase = (amount: number, phoneNumber: string, network: string, plan: string) => {
    handleBillPayment(amount, `${network.toUpperCase()} ${plan} for ${phoneNumber}`);
  };

  // Handle TV subscription
  const handleTvSubscription = (amount: number, smartCardNumber: string, provider: string, plan: string) => {
    handleBillPayment(amount, `${provider.toUpperCase()} ${plan} for ${smartCardNumber}`);
  };

  // Handle Netflix subscription
  const handleNetflixSubscription = (amount: number, email: string, plan: string) => {
    handleBillPayment(amount, `Netflix ${plan} Subscription for ${email}`);
  };

  // Handle Electricity bill payment
  const handleElectricityPayment = (amount: number, meterNumber: string, provider: string) => {
    handleBillPayment(amount, `${provider.toUpperCase()} Electricity for Meter ${meterNumber}`);
  };
  
  // Handle bill selection
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

  // Handle opening transaction details
  const handleOpenTransactionDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Welcome, Ade!</h2>
      <p className="text-muted-foreground">
        Here's an overview of your financial activities and options.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <WalletSummaryCard 
          balance={balance} 
          lastTransaction={lastTransaction}
          onAddFunds={() => setIsDepositModalOpen(true)}
          accountNumber="234 567 8910"
        />
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Upcoming Loan Payment</CardTitle>
            <CardDescription>
              Please ensure you have sufficient funds before the due date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Due on {loanDueDate}</p>
                <p className="text-2xl font-bold">NGN {loanAmount}</p>
              </div>
              <Button onClick={() => navigate("/loan")}>
                View Loan Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <QuickActionsPanel 
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
        onTransfer={handleTransfer}
        balance={parseInt(balance.replace(/,/g, ""), 10)}
      />
      
      <BillPaymentPanel onSelectBillType={handleBillSelect} />
      
      <AlertBanner
        type="warning"
        message="Complete your KYC verification to increase your transaction limits."
        onClose={() => {}}
      />
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate("/transactions")}>
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleOpenTransactionDetails(transaction)}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    transaction.type === "credit" ? "bg-ww-green-100 text-ww-green-500" : "bg-ww-purple-100 text-ww-purple-500"
                  }`}>
                    {transaction.type === "credit" ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-medium ${transaction.type === "credit" ? "text-ww-green-600" : ""}`}>
                  {transaction.type === "credit" ? "+" : "-"} NGN {transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Savings Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>House Fund</span>
                  <span className="font-medium">60%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-ww-purple-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Emergency Fund</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-ww-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate("/savings")}>
                Manage Savings Plans
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-ww-purple-500 pl-4 py-1">
                <p className="font-medium">Loan Reminder</p>
                <p className="text-sm text-muted-foreground">Your loan payment is due in 5 days</p>
              </div>
              
              <div className="border-l-4 border-ww-green-500 pl-4 py-1">
                <p className="font-medium">Savings Goal Milestone</p>
                <p className="text-sm text-muted-foreground">You've reached 60% of your House Fund target!</p>
              </div>
              
              <div className="border-l-4 border-gray-300 pl-4 py-1">
                <p className="font-medium">New Feature Available</p>
                <p className="text-sm text-muted-foreground">Try our new bill payment service</p>
              </div>
            </div>
          </CardContent>
        </Card>
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

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Dashboard;
