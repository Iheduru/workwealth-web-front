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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Loader from "@/components/atoms/Loader";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxAmount: number;
  onSuccess?: (amount: number) => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  maxAmount,
  onSuccess,
}) => {
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("bank");
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const withdrawAmount = parseFloat(amount);
    
    if (!amount || withdrawAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than zero.",
        variant: "destructive",
      });
      return;
    }
    
    if (withdrawAmount > maxAmount) {
      toast({
        title: "Insufficient Funds",
        description: `Cannot withdraw more than your available balance of NGN ${maxAmount.toLocaleString()}.`,
        variant: "destructive",
      });
      return;
    }

    if (destination === "bank" && (!accountNumber || accountNumber.length < 10)) {
      toast({
        title: "Invalid Account",
        description: "Please enter a valid account number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Withdrawal Initiated",
        description: `NGN ${withdrawAmount.toLocaleString()} will be processed to your selected destination shortly.`,
      });
      
      if (onSuccess) {
        onSuccess(withdrawAmount);
      }
      
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setAmount("");
    setDestination("bank");
    setAccountNumber("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Transfer money from your WorkWealth wallet to your bank account or other destinations.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
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
                autoFocus
                className="col-span-3"
              />
              <p className="text-xs text-muted-foreground">
                Available Balance: NGN {maxAmount.toLocaleString()}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="destination">Withdraw To</Label>
              <Select value={destination} onValueChange={setDestination} required>
                <SelectTrigger id="destination">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Account</SelectItem>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                  <SelectItem value="agent">Agent Network</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {destination === "bank" && (
              <div className="grid gap-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader size="sm" /> : "Withdraw"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
