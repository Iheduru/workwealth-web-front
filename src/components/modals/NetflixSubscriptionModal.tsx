
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

interface NetflixSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (amount: number, email: string, plan: string) => void;
  maxAmount: number;
}

const NetflixSubscriptionModal: React.FC<NetflixSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  maxAmount,
}) => {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Netflix plans
  const netflixPlans = [
    { id: "netflix-mobile", name: "Mobile", price: 1200 },
    { id: "netflix-basic", name: "Basic with ads", price: 2900 },
    { id: "netflix-standard", name: "Standard", price: 4400 },
    { id: "netflix-premium", name: "Premium", price: 5500 }
  ];

  // Get the selected plan price
  const getSelectedPlanPrice = () => {
    if (!plan) return 0;
    const selectedPlan = netflixPlans.find(p => p.id === plan);
    return selectedPlan ? selectedPlan.price : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
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
        title: "Netflix Subscription Successful",
        description: `Your Netflix subscription has been renewed.`,
      });
      
      if (onSuccess) {
        // Get the plan name
        const selectedPlan = netflixPlans.find(p => p.id === plan);
        onSuccess(planAmount, email, selectedPlan?.name || plan);
      }
      
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setEmail("");
    setPlan("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Netflix Subscription</DialogTitle>
          <DialogDescription>
            Renew your Netflix subscription.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Netflix Account Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your Netflix email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="plan">Select Plan</Label>
              <Select value={plan} onValueChange={setPlan} required>
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  {netflixPlans.map(plan => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} - ₦{plan.price.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
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

export default NetflixSubscriptionModal;
