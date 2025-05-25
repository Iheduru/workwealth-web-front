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
    const headers = ["ID", "Description", "Amount", "Type", "Date", "Category"];
    
    const csvContent = [
      headers.join(","),
      ...transactions.map(t => 
        [t.id, t.description, t.amount, t.type, t.date, t.category || "uncategorized"].join(",")
      )
    ].join("\n");
    
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-100 dark:to-white bg-clip-text text-transparent">
              Transactions
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Manage and track all your financial activities</p>
          </div>
          <Button 
            onClick={handleExport}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Quick Transaction Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="group relative overflow-hidden h-20 flex items-center justify-center border-2 border-dashed border-emerald-200 hover:border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 hover:from-emerald-100/80 hover:to-teal-100/80 dark:from-emerald-950/20 dark:to-teal-950/20 dark:border-emerald-800 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            onClick={() => setIsDepositModalOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <PlusIcon className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-left">
              <span className="block font-semibold text-emerald-800 dark:text-emerald-200">Deposit</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400">Add funds</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="group relative overflow-hidden h-20 flex items-center justify-center border-2 border-dashed border-amber-200 hover:border-amber-300 bg-gradient-to-br from-amber-50/80 to-orange-50/80 hover:from-amber-100/80 hover:to-orange-100/80 dark:from-amber-950/20 dark:to-orange-950/20 dark:border-amber-800 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            onClick={() => setIsWithdrawModalOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ArrowDownIcon className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-left">
              <span className="block font-semibold text-amber-800 dark:text-amber-200">Withdraw</span>
              <span className="text-xs text-amber-600 dark:text-amber-400">Get cash</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="group relative overflow-hidden h-20 flex items-center justify-center border-2 border-dashed border-blue-200 hover:border-blue-300 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 hover:from-blue-100/80 hover:to-indigo-100/80 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            onClick={() => setIsTransferModalOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ArrowRightIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-left">
              <span className="block font-semibold text-blue-800 dark:text-blue-200">Transfer</span>
              <span className="text-xs text-blue-600 dark:text-blue-400">Send money</span>
            </div>
          </Button>
        </div>

        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
            <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">Search & Filter</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 focus:border-purple-500 dark:focus:border-purple-400"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <Select value={filterType} onValueChange={handleTypeChange}>
                <SelectTrigger className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Transaction type" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Credit (In)</SelectItem>
                  <SelectItem value="debit">Debit (Out)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
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

        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
            <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">Transaction History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {transactions.length > 0 ? (
              <div className="rounded-md">
                {!isMobile ? (
                  <>
                    <div className="grid grid-cols-12 gap-4 py-4 px-6 font-medium text-sm bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300">
                      <div className="col-span-5">Description</div>
                      <div className="col-span-2 text-right">Amount</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-1"></div>
                    </div>
                    
                    <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="grid grid-cols-12 gap-4 py-4 px-6 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-transparent dark:hover:from-slate-700/30 dark:hover:to-transparent text-sm transition-all duration-200">
                          <div className="col-span-5">
                            <p className="font-semibold text-slate-900 dark:text-white">{transaction.description}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs capitalize">{transaction.category || "uncategorized"}</p>
                          </div>
                          
                          <div className={`col-span-2 text-right font-bold ${
                            transaction.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"
                          }`}>
                            {transaction.type === "credit" ? "+" : "-"} NGN {transaction.amount}
                          </div>
                          
                          <div className="col-span-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              transaction.type === "credit" 
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" 
                                : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                            }`}>
                              {transaction.type === "credit" ? "Credit" : "Debit"}
                            </span>
                          </div>
                          
                          <div className="col-span-2 text-slate-600 dark:text-slate-400">
                            {transaction.date}
                          </div>
                          
                          <div className="col-span-1 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700"
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
                  <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                    {transactions.map((transaction) => (
                      <div 
                        key={transaction.id} 
                        className="p-4 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-transparent dark:hover:from-slate-700/30 dark:hover:to-transparent transition-all duration-200"
                        onClick={() => viewTransactionDetails(transaction)}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-semibold text-slate-900 dark:text-white">{transaction.description}</p>
                          <span className={`font-bold ${
                            transaction.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"
                          }`}>
                            {transaction.type === "credit" ? "+" : "-"} NGN {transaction.amount}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              transaction.type === "credit" 
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" 
                                : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                            }`}>
                              {transaction.type === "credit" ? "Credit" : "Debit"}
                            </span>
                            <span className="text-xs capitalize text-slate-500 dark:text-slate-400">{transaction.category || "uncategorized"}</span>
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {transaction.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">No transactions match your filters</p>
                <Button 
                  variant="link" 
                  className="mt-2 text-purple-600 hover:text-purple-700" 
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
    </div>
  );
};

export default Transactions;
