
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader } from "@/components/atoms/Loader";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxAmount: number;
  onSuccess?: (amount: number, recipient: string) => void;
}

const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  maxAmount,
  onSuccess,
}) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transferAmount = parseFloat(amount);
    
    if (!amount || transferAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than zero.",
        variant: "destructive",
      });
      return;
    }
    
    if (transferAmount > maxAmount) {
      toast({
        title: "Insufficient Funds",
        description: `Cannot transfer more than your available balance of NGN ${maxAmount.toLocaleString()}.`,
        variant: "destructive",
      });
      return;
    }

    if (!recipient || recipient.length < 5) {
      toast({
        title: "Invalid Recipient",
        description: "Please enter a valid recipient identifier.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Transfer Successful",
        description: `NGN ${transferAmount.toLocaleString()} has been sent to ${recipient}.`,
      });
      
      if (onSuccess) {
        onSuccess(transferAmount, recipient);
      }
      
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setAmount("");
    setRecipient("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Funds</DialogTitle>
          <DialogDescription>
            Send money to other WorkWealth users or external accounts.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="Username or account number"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (NGN)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                max={maxAmount.toString()}
                step="100"
                required
                className="col-span-3"
              />
              <p className="text-xs text-muted-foreground">
                Available Balance: NGN {maxAmount.toLocaleString()}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader size="sm" /> : "Transfer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransferModal;
