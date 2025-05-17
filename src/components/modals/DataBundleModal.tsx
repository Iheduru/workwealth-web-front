
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

interface DataBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (amount: number, phoneNumber: string, network: string, plan: string) => void;
  maxAmount: number;
}

const DataBundleModal: React.FC<DataBundleModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  maxAmount,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [network, setNetwork] = useState("");
  const [dataPlan, setDataPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Data plans organized by network
  const dataPlans = {
    mtn: [
      { id: "mtn-500mb", name: "500MB - Daily (₦300)", price: 300 },
      { id: "mtn-1gb", name: "1GB - Weekly (₦500)", price: 500 },
      { id: "mtn-3gb", name: "3GB - Monthly (₦1,500)", price: 1500 },
      { id: "mtn-10gb", name: "10GB - Monthly (₦3,000)", price: 3000 }
    ],
    airtel: [
      { id: "airtel-500mb", name: "500MB - 3 Days (₦300)", price: 300 },
      { id: "airtel-1.5gb", name: "1.5GB - Weekly (₦500)", price: 500 },
      { id: "airtel-3gb", name: "3GB - Monthly (₦1,500)", price: 1500 },
      { id: "airtel-10gb", name: "10GB - Monthly (₦3,000)", price: 3000 }
    ],
    glo: [
      { id: "glo-500mb", name: "500MB - 3 Days (₦200)", price: 200 },
      { id: "glo-1.5gb", name: "1.5GB - Weekly (₦500)", price: 500 },
      { id: "glo-3gb", name: "3GB - Monthly (₦1,000)", price: 1000 },
      { id: "glo-10gb", name: "10GB - Monthly (₦2,500)", price: 2500 }
    ],
    "9mobile": [
      { id: "9mobile-500mb", name: "500MB - Daily (₦300)", price: 300 },
      { id: "9mobile-1.5gb", name: "1.5GB - Weekly (₦500)", price: 500 },
      { id: "9mobile-3gb", name: "3GB - Monthly (₦1,500)", price: 1500 },
      { id: "9mobile-10gb", name: "10GB - Monthly (₦3,000)", price: 3000 }
    ]
  };

  // Get the selected plan price
  const getSelectedPlanPrice = () => {
    if (!network || !dataPlan) return 0;
    const plan = dataPlans[network as keyof typeof dataPlans]?.find(p => p.id === dataPlan);
    return plan ? plan.price : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

    if (!dataPlan) {
      toast({
        title: "Select Data Plan",
        description: "Please select a data plan.",
        variant: "destructive",
      });
      return;
    }

    const planAmount = getSelectedPlanPrice();
    
    if (planAmount > maxAmount) {
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
        title: "Data Purchase Successful",
        description: `Data bundle purchased for ${phoneNumber}.`,
      });
      
      if (onSuccess) {
        // Get the plan name
        const selectedPlan = dataPlans[network as keyof typeof dataPlans]?.find(p => p.id === dataPlan);
        onSuccess(planAmount, phoneNumber, network, selectedPlan?.name || dataPlan);
      }
      
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setPhoneNumber("");
    setNetwork("");
    setDataPlan("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy Data Bundle</DialogTitle>
          <DialogDescription>
            Purchase internet data for any Nigerian mobile number.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="network">Network Provider</Label>
              <Select value={network} onValueChange={(value) => {
                setNetwork(value);
                setDataPlan("");  // Reset selected plan when network changes
              }} required>
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
            
            {network && (
              <div className="grid gap-2">
                <Label htmlFor="dataPlan">Select Data Plan</Label>
                <Select value={dataPlan} onValueChange={setDataPlan} required disabled={!network}>
                  <SelectTrigger id="dataPlan">
                    <SelectValue placeholder="Select data plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {network && dataPlans[network as keyof typeof dataPlans]?.map(plan => (
                      <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {dataPlan && (
              <div className="text-sm font-medium flex justify-between p-2 bg-muted rounded-md">
                <span>Amount:</span>
                <span>NGN {getSelectedPlanPrice().toLocaleString()}</span>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground">
              Available balance: NGN {maxAmount.toLocaleString()}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader size="sm" /> : "Purchase Data"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DataBundleModal;
