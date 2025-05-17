
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

interface ElectricityBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (amount: number, meterNumber: string, provider: string) => void;
  maxAmount: number;
}

const ElectricityBillModal: React.FC<ElectricityBillModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  maxAmount,
}) => {
  const [meterNumber, setMeterNumber] = useState("");
  const [provider, setProvider] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [meterType, setMeterType] = useState("prepaid");

  // Electricity providers in Nigeria
  const providers = [
    { id: "ekedc", name: "Eko Electric (EKEDC)" },
    { id: "ikedc", name: "Ikeja Electric (IKEDC)" },
    { id: "aedc", name: "Abuja Electric (AEDC)" },
    { id: "phedc", name: "Port Harcourt Electric (PHEDC)" },
    { id: "kedco", name: "Kano Electric (KEDCO)" },
    { id: "ibedc", name: "Ibadan Electric (IBEDC)" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!meterNumber) {
      toast({
        title: "Invalid Meter Number",
        description: "Please enter a valid meter number.",
        variant: "destructive",
      });
      return;
    }

    if (!provider) {
      toast({
        title: "Select Provider",
        description: "Please select an electricity provider.",
        variant: "destructive",
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than zero.",
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
      
      const selectedProvider = providers.find(p => p.id === provider)?.name || provider;
      
      toast({
        title: "Electricity Bill Payment Successful",
        description: `NGN ${numericAmount.toLocaleString()} ${meterType} payment made to ${selectedProvider}.`,
      });
      
      if (onSuccess) {
        onSuccess(numericAmount, meterNumber, provider);
      }
      
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setMeterNumber("");
    setProvider("");
    setAmount("");
    setMeterType("prepaid");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Electricity Bill Payment</DialogTitle>
          <DialogDescription>
            Pay for electricity with any provider in Nigeria.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="provider">Electricity Provider</Label>
              <Select value={provider} onValueChange={setProvider} required>
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map(provider => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="meterType">Meter Type</Label>
              <Select value={meterType} onValueChange={setMeterType} required>
                <SelectTrigger id="meterType">
                  <SelectValue placeholder="Select meter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prepaid">Prepaid</SelectItem>
                  <SelectItem value="postpaid">Postpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="meterNumber">Meter Number</Label>
              <Input
                id="meterNumber"
                placeholder="Enter meter number"
                value={meterNumber}
                onChange={(e) => setMeterNumber(e.target.value)}
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
                min="1000"
                max={maxAmount.toString()}
                step="100"
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
              {isLoading ? <Loader size="sm" /> : "Pay Bill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ElectricityBillModal;
