
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CreditCard, Plus, ArrowUpRight } from "lucide-react";

interface WalletSummaryCardProps {
  balance: string;
  currency?: string;
  lastTransaction?: {
    amount: string;
    date: string;
    type: "credit" | "debit";
  };
  className?: string;
  onAddFunds?: () => void;
  accountNumber?: string;
}

const WalletSummaryCard: React.FC<WalletSummaryCardProps> = ({
  balance,
  currency = "NGN",
  lastTransaction,
  className = "",
  onAddFunds,
  accountNumber = "234 567 8910",
}) => {
  return (
    <Card className={cn("overflow-hidden h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300", className)}>
      <CardHeader className="text-white pb-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 transform translate-x-8 -translate-y-8"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 transform -translate-x-4 translate-y-4"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm font-medium text-white/80 mb-1">Available Balance</div>
              <div className="flex items-baseline">
                <span className="text-lg font-semibold mr-2 text-white/90">{currency}</span>
                <span className="text-4xl font-bold tracking-tight text-white">{balance}</span>
              </div>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-sm text-white/80 mb-1">Account Number</div>
              <div className="font-mono text-lg tracking-wider text-white font-semibold">{accountNumber}</div>
            </div>
            
            {onAddFunds && (
              <button 
                onClick={onAddFunds}
                className="flex items-center justify-center w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 px-4 py-3 rounded-xl text-white font-semibold group"
              >
                <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Add Funds
                <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm pt-6">
        {lastTransaction ? (
          <div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">Last Transaction</div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  lastTransaction.type === "credit" 
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" 
                    : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                }`}>
                  {lastTransaction.type === "credit" ? "↗" : "↙"}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {lastTransaction.type === "credit" ? "Received" : "Sent"} {currency} {lastTransaction.amount}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{lastTransaction.date}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No recent transactions</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletSummaryCard;
