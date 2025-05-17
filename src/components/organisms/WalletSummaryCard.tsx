
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CreditCard } from "lucide-react";

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
    <Card className={cn("overflow-hidden w-full", className)}>
      <CardHeader className="bg-gradient-to-r from-ww-purple-600 to-ww-purple-800 text-white pb-4 dark:from-ww-purple-800 dark:to-ww-purple-900 relative">
        <div className="absolute top-4 right-6">
          <CreditCard className="h-8 w-8 text-white/80" />
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-xs font-medium text-ww-purple-100">Available Balance</div>
          <div className="flex items-baseline mt-1">
            <span className="text-sm mr-1">{currency}</span>
            <span className="text-3xl font-bold">{balance}</span>
          </div>
          
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="text-xs text-ww-purple-100">Account Number</div>
            <div className="font-mono text-lg tracking-wider mt-1">{accountNumber}</div>
          </div>
          
          {onAddFunds && (
            <button 
              onClick={onAddFunds}
              className="text-xs bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full mt-2"
            >
              Add Funds
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {lastTransaction ? (
          <div className="text-sm">
            <div className="text-xs text-muted-foreground font-medium">Last Transaction</div>
            <div className="flex justify-between mt-1">
              <span>
                {lastTransaction.type === "credit" ? "Received" : "Sent"}{" "}
                {currency} {lastTransaction.amount}
              </span>
              <span className="text-xs text-muted-foreground">{lastTransaction.date}</span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No recent transactions</div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletSummaryCard;
