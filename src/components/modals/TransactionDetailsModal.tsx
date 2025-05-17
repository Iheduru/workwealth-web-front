
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, FileText, Copy } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    id: string;
    amount: string;
    date: string;
    type: "credit" | "debit";
    description: string;
    reference?: string;
    recipient?: string;
    sender?: string;
    status: "completed" | "pending" | "failed";
  } | null;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  if (!transaction) return null;

  const handleCopyReference = () => {
    if (transaction.reference) {
      navigator.clipboard.writeText(transaction.reference);
      toast.success("Reference copied to clipboard");
    }
  };

  const formattedDate = transaction.date ? new Date(transaction.date).toLocaleString() : "";
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            View the details of your transaction.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-6">
          {/* Transaction Status & Icon */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                transaction.type === "credit" 
                  ? "bg-ww-green-100 text-ww-green-500" 
                  : "bg-ww-purple-100 text-ww-purple-500"
              }`}>
                {transaction.type === "credit" ? (
                  <ArrowUpRight className="h-6 w-6" />
                ) : (
                  <ArrowDownRight className="h-6 w-6" />
                )}
              </div>
              <div>
                <p className="font-semibold text-lg">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
            <div className={`font-bold text-lg ${
              transaction.type === "credit" ? "text-ww-green-600" : ""
            }`}>
              {transaction.type === "credit" ? "+" : "-"} NGN {transaction.amount}
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-3 pt-2 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className={`font-medium ${
                transaction.status === "completed" ? "text-ww-green-600" :
                transaction.status === "failed" ? "text-red-600" : "text-amber-600"
              }`}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono">{transaction.id.substring(0, 8)}...</span>
            </div>

            {transaction.reference && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference</span>
                <div className="flex items-center">
                  <span className="font-mono mr-2">{transaction.reference}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleCopyReference} 
                    className="h-6 w-6"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
            
            {transaction.recipient && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recipient</span>
                <span>{transaction.recipient}</span>
              </div>
            )}

            {transaction.sender && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sender</span>
                <span>{transaction.sender}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-2">
            <Button className="w-full" variant="outline">
              <FileText className="mr-2 h-4 w-4" /> Download Receipt
            </Button>
            <Button className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailsModal;
