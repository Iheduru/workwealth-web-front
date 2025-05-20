
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, Eye, PlusIcon, ArrowRightIcon, ArrowDownIcon } from "lucide-react";
import { getAllTransactions, Transaction as TransactionType } from "@/services/transactionService";
import { useIsMobile } from "@/hooks/use-mobile";
import TransactionDetailsModal from "@/components/modals/TransactionDetailsModal";
import DepositModal from "@/components/modals/DepositModal";
import WithdrawModal from "@/components/modals/WithdrawModal";
import TransferModal from "@/components/modals/TransferModal";
import { toast } from "@/components/ui/sonner";
import {
  addDeposit,
  addWithdrawal,
  addTransfer
} from "@/services/transactionService";

const Transactions = () => {
  const isMobile = useIsMobile();
  const [allTransactions, setAllTransactions] = useState<TransactionType[]>([]);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType | null>(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Load transactions on component mount
  useEffect(() => {
    const loadedTransactions = getAllTransactions();
    setAllTransactions(loadedTransactions);
    setTransactions(loadedTransactions);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    applyFilters(e.target.value, filterType, filterCategory);
  };

  const handleTypeChange = (value: string) => {
    setFilterType(value);
    applyFilters(searchTerm, value, filterCategory);
  };

  const handleCategoryChange = (value: string) => {
    setFilterCategory(value);
    applyFilters(searchTerm, filterType, value);
  };

  const applyFilters = (search: string, type: string, category: string) => {
    let filtered = allTransactions;
    
    if (search) {
      filtered = filtered.filter(
        t => t.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (type !== "all") {
      filtered = filtered.filter(t => t.type === type);
    }
    
    if (category !== "all") {
      filtered = filtered.filter(t => t.category === category);
    }
    
    setTransactions(filtered);
  };

  const handleExport = () => {
    // Mock export functionality - in a real app, this would generate a CSV
    const headers = ["ID", "Description", "Amount", "Type", "Date", "Category"];
    
    // Convert transactions to CSV format
    const csvContent = [
      headers.join(","),
      ...transactions.map(t => 
        [t.id, t.description, t.amount, t.type, t.date, t.category || "uncategorized"].join(",")
      )
    ].join("\n");
    
    // Create a blob and download it
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `transactions_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewTransactionDetails = (transaction: TransactionType) => {
    setSelectedTransaction(transaction);
    setIsTransactionModalOpen(true);
  };

  const handleDeposit = (amount: number) => {
    try {
      const newTransaction = addDeposit(amount);
      setAllTransactions(getAllTransactions());
      setTransactions(prev => [newTransaction, ...prev]);
      toast.success("Deposit successful");
    } catch (error) {
      toast.error("Deposit failed");
    }
  };

  const handleWithdrawal = (amount: number) => {
    try {
      const newTransaction = addWithdrawal(amount);
      setAllTransactions(getAllTransactions());
      setTransactions(prev => [newTransaction, ...prev]);
      toast.success("Withdrawal successful");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Withdrawal failed");
      }
    }
  };

  const handleTransfer = (amount: number, recipient: string) => {
    try {
      const newTransaction = addTransfer(amount, recipient);
      setAllTransactions(getAllTransactions());
      setTransactions(prev => [newTransaction, ...prev]);
      toast.success(`Successfully transferred to ${recipient}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Transfer failed");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
          <Button className="order-2 sm:order-1" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Quick Transaction Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button
          variant="outline"
          className="flex items-center justify-center border-dashed h-16 border-ww-purple-200 hover:border-ww-purple-300 hover:bg-ww-purple-50 dark:hover:bg-ww-purple-900/20"
          onClick={() => setIsDepositModalOpen(true)}
        >
          <PlusIcon className="h-5 w-5 mr-2 text-ww-purple-500" />
          <div className="text-left">
            <span className="block font-medium">Deposit</span>
            <span className="text-xs text-muted-foreground">Add funds</span>
          </div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center justify-center border-dashed h-16 border-ww-purple-200 hover:border-ww-purple-300 hover:bg-ww-purple-50 dark:hover:bg-ww-purple-900/20"
          onClick={() => setIsWithdrawModalOpen(true)}
        >
          <ArrowDownIcon className="h-5 w-5 mr-2 text-ww-purple-500" />
          <div className="text-left">
            <span className="block font-medium">Withdraw</span>
            <span className="text-xs text-muted-foreground">Get cash</span>
          </div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center justify-center border-dashed h-16 border-ww-purple-200 hover:border-ww-purple-300 hover:bg-ww-purple-50 dark:hover:bg-ww-purple-900/20"
          onClick={() => setIsTransferModalOpen(true)}
        >
          <ArrowRightIcon className="h-5 w-5 mr-2 text-ww-purple-500" />
          <div className="text-left">
            <span className="block font-medium">Transfer</span>
            <span className="text-xs text-muted-foreground">Send money</span>
          </div>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <Select value={filterType} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit (In)</SelectItem>
                <SelectItem value="debit">Debit (Out)</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
                <SelectItem value="loan">Loans</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="bills">Bills</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {transactions.length > 0 ? (
            <div className="rounded-md border">
              {!isMobile ? (
                <>
                  <div className="grid grid-cols-12 gap-4 py-3 px-4 font-medium text-sm bg-muted/50">
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2 text-right">Amount</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-1"></div>
                  </div>
                  
                  <div className="divide-y">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="grid grid-cols-12 gap-4 py-3 px-4 hover:bg-muted/30 text-sm">
                        <div className="col-span-5">
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-muted-foreground text-xs capitalize">{transaction.category || "uncategorized"}</p>
                        </div>
                        
                        <div className={`col-span-2 text-right font-medium ${
                          transaction.type === "credit" ? "text-ww-green-600" : ""
                        }`}>
                          {transaction.type === "credit" ? "+" : "-"} NGN {transaction.amount}
                        </div>
                        
                        <div className="col-span-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            transaction.type === "credit" 
                              ? "bg-ww-green-100 text-ww-green-800 dark:bg-ww-green-900/30 dark:text-ww-green-300" 
                              : "bg-ww-purple-100 text-ww-purple-800 dark:bg-ww-purple-900/30 dark:text-ww-purple-300"
                          }`}>
                            {transaction.type === "credit" ? "Credit" : "Debit"}
                          </span>
                        </div>
                        
                        <div className="col-span-2 text-muted-foreground">
                          {transaction.date}
                        </div>
                        
                        <div className="col-span-1 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => viewTransactionDetails(transaction)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="divide-y">
                  {transactions.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="p-4 hover:bg-muted/30"
                      onClick={() => viewTransactionDetails(transaction)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">{transaction.description}</p>
                        <span className={`font-medium ${
                          transaction.type === "credit" ? "text-ww-green-600" : ""
                        }`}>
                          {transaction.type === "credit" ? "+" : "-"} NGN {transaction.amount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className={`mr-2 px-2 py-0.5 rounded-full text-xs ${
                            transaction.type === "credit" 
                              ? "bg-ww-green-100 text-ww-green-800 dark:bg-ww-green-900/30 dark:text-ww-green-300" 
                              : "bg-ww-purple-100 text-ww-purple-800 dark:bg-ww-purple-900/30 dark:text-ww-purple-300"
                          }`}>
                            {transaction.type === "credit" ? "Credit" : "Debit"}
                          </span>
                          <span className="text-xs capitalize text-muted-foreground">{transaction.category || "uncategorized"}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {transaction.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No transactions match your filters</p>
              <Button 
                variant="link" 
                className="mt-2" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setFilterCategory("all");
                  setTransactions(allTransactions);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        transaction={selectedTransaction}
      />

      {/* Transaction Action Modals */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onSuccess={handleDeposit}
      />

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        maxAmount={parseFloat(getAllTransactions()[0]?.amount.replace(/,/g, "") || "0")}
        onSuccess={handleWithdrawal}
      />

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        maxAmount={parseFloat(getAllTransactions()[0]?.amount.replace(/,/g, "") || "0")}
        onSuccess={handleTransfer}
      />
    </div>
  );
};

export default Transactions;
