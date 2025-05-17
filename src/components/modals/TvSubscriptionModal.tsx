
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

interface TvSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (amount: number, smartCardNumber: string, provider: string, plan: string) => void;
  maxAmount: number;
}

const TvSubscriptionModal: React.FC<TvSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  maxAmount,
}) => {
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [provider, setProvider] = useState("");
  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // TV plans organized by provider
  const tvPlans = {
    dstv: [
      { id: "dstv-padi", name: "DStv Padi", price: 2150 },
      { id: "dstv-yanga", name: "DStv Yanga", price: 3500 },
      { id: "dstv-confam", name: "DStv Confam", price: 6200 },
      { id: "dstv-compact", name: "DStv Compact", price: 10500 },
      { id: "dstv-premium", name: "DStv Premium", price: 24500 }
    ],
    gotv: [
      { id: "gotv-lite", name: "GOtv Lite", price: 900 },
      { id: "gotv-jinja", name: "GOtv Jinja", price: 2250 },
      { id: "gotv-jolli", name: "GOtv Jolli", price: 3300 },
      { id: "gotv-max", name: "GOtv Max", price: 4850 }
    ],
    startimes: [
      { id: "startimes-nova", name: "StarTimes Nova", price: 1200 },
      { id: "startimes-basic", name: "StarTimes Basic", price: 1900 },
      { id: "startimes-smart", name: "StarTimes Smart", price: 2800 },
      { id: "startimes-classic", name: "StarTimes Classic", price: 3800 }
    ]
  };

  // Get the selected plan price
  const getSelectedPlanPrice = () => {
    if (!provider || !plan) return 0;
    const selectedPlan = tvPlans[provider as keyof typeof tvPlans]?.find(p => p.id === plan);
    return selectedPlan ? selectedPlan.price : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!smartCardNumber) {
      toast({
        title: "Invalid SmartCard Number",
        description: "Please enter a valid smartcard number.",
        variant: "destructive",
      });
      return;
    }

    if (!provider) {
      toast({
        title: "Select Provider",
        description: "Please select a TV provider.",
        variant: "destructive",
      });
      return;
    }

    if (!plan) {
      toast({
        title: "Select Plan",
        description: "Please select a subscription plan.",
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
        title: "TV Subscription Successful",
        description: `Your ${provider.toUpperCase()} subscription has been renewed.`,
      });
      
      if (onSuccess) {
        // Get the plan name
        const selectedPlan = tvPlans[provider as keyof typeof tvPlans]?.find(p => p.id === plan);
        onSuccess(planAmount, smartCardNumber, provider, selectedPlan?.name || plan);
      }
      
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setSmartCardNumber("");
    setProvider("");
    setPlan("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>TV Subscription</DialogTitle>
          <DialogDescription>
            Renew your TV subscription for any provider.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="provider">TV Provider</Label>
              <Select value={provider} onValueChange={(value) => {
                setProvider(value);
                setPlan("");  // Reset selected plan when provider changes
              }} required>
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dstv">DStv</SelectItem>
                  <SelectItem value="gotv">GOtv</SelectItem>
                  <SelectItem value="startimes">StarTimes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="smartcard">SmartCard/IUC Number</Label>
              <Input
                id="smartcard"
                placeholder="Enter smartcard number"
                value={smartCardNumber}
                onChange={(e) => setSmartCardNumber(e.target.value)}
                required
              />
            </div>
            
            {provider && (
              <div className="grid gap-2">
                <Label htmlFor="plan">Select Package</Label>
                <Select value={plan} onValueChange={setPlan} required disabled={!provider}>
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    {provider && tvPlans[provider as keyof typeof tvPlans]?.map(plan => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name} - ₦{plan.price.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {plan && (
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
              {isLoading ? <Loader size="sm" /> : "Pay Now"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TvSubscriptionModal;
