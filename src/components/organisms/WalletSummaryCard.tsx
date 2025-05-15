
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
}

const WalletSummaryCard: React.FC<WalletSummaryCardProps> = ({
  balance,
  currency = "NGN",
  lastTransaction,
  className = "",
  onAddFunds,
}) => {
  return (
    <Card className={cn("overflow-hidden w-full", className)}>
      <CardHeader className="bg-ww-purple-500 text-white pb-4 dark:bg-ww-purple-700">
        <div className="text-xs font-medium text-ww-purple-100">Available Balance</div>
        <div className="flex items-baseline mt-1">
          <span className="text-sm mr-1">{currency}</span>
          <span className="text-3xl font-bold">{balance}</span>
        </div>
        {onAddFunds && (
          <button 
            onClick={onAddFunds}
            className="text-xs bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full mt-2"
          >
            Add Funds
          </button>
        )}
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
