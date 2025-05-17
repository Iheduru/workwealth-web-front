
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

interface AirtimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (amount: number, phoneNumber: string, network: string) => void;
  maxAmount: number;
}

const AirtimeModal: React.FC<AirtimeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  maxAmount,
}) => {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [network, setNetwork] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than zero.",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber || phoneNumber.length !== 11) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 11 digit phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!network) {
      toast({
        title: "Select Network",
        description: "Please select a network provider.",
        variant: "destructive",
      });
      return;
    }

    const numericAmount = parseFloat(amount);
    
    if (numericAmount > maxAmount) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough funds to complete this transaction.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Airtime Purchase Successful",
        description: `NGN ${numericAmount.toLocaleString()} airtime sent to ${phoneNumber}.`,
      });
      
      if (onSuccess) {
        onSuccess(numericAmount, phoneNumber, network);
      }
      
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setAmount("");
    setPhoneNumber("");
    setNetwork("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy Airtime</DialogTitle>
          <DialogDescription>
            Purchase airtime for any Nigerian mobile number.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="network">Network Provider</Label>
              <Select value={network} onValueChange={setNetwork} required>
                <SelectTrigger id="network">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtn">MTN</SelectItem>
                  <SelectItem value="airtel">Airtel</SelectItem>
                  <SelectItem value="glo">Glo</SelectItem>
                  <SelectItem value="9mobile">9mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={11}
                required
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
                min="50"
                max={maxAmount.toString()}
                step="50"
                required
              />
              <div className="text-xs text-muted-foreground">
                Available balance: NGN {maxAmount.toLocaleString()}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader size="sm" /> : "Buy Airtime"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AirtimeModal;
