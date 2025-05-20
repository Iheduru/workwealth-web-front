
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { PlusIcon, Trash2, PieChart, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";

// Mock savings goals data
const initialSavingsGoals = [
  {
    id: "1",
    name: "House Fund",
    targetAmount: 2000000,
    currentAmount: 1200000,
    color: "bg-ww-purple-500",
    deadline: "2026-01-01",
  },
  {
    id: "2",
    name: "Emergency Fund",
    targetAmount: 500000,
    currentAmount: 125000,
    color: "bg-ww-green-500",
    deadline: "2025-06-30",
  },
];

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  color: string;
  deadline: string;
}

const SavingsSetup = () => {
  const { toast } = useToast();
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  });
  const [activeView, setActiveView] = useState<"list" | "chart">("list");

  // Load initial data
  useEffect(() => {
    // In a real app, we would fetch this from an API
    setSavingsGoals(initialSavingsGoals);
  }, []);

  const handleAddFunds = (goalId: string, amount: number) => {
    setSavingsGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === goalId) {
          const newAmount = goal.currentAmount + amount;
          return {
            ...goal,
            currentAmount: newAmount > goal.targetAmount ? goal.targetAmount : newAmount,
          };
        }
        return goal;
      })
    );
    
    toast({
      title: "Funds added",
      description: `NGN ${amount.toLocaleString()} added to your savings goal.`,
    });
  };

  const handleDeleteGoal = (goalId: string) => {
    setSavingsGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    
    toast({
      title: "Goal deleted",
      description: "Your savings goal has been deleted.",
      variant: "destructive",
    });
  };

  const handleCreateGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const targetAmount = parseFloat(newGoal.targetAmount);
    const currentAmount = parseFloat(newGoal.currentAmount) || 0;
    
    if (isNaN(targetAmount) || targetAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid target amount.",
        variant: "destructive",
      });
      return;
    }

    if (currentAmount > targetAmount) {
      toast({
        title: "Invalid amount",
        description: "Current amount cannot be greater than target amount.",
        variant: "destructive",
      });
      return;
    }

    const colors = [
      "bg-ww-purple-500", 
      "bg-ww-green-500", 
      "bg-blue-500", 
      "bg-amber-500", 
      "bg-rose-500"
    ];

    const newSavingsGoal: SavingsGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount,
      currentAmount,
      color: colors[Math.floor(Math.random() * colors.length)],
      deadline: newGoal.deadline,
    };

    setSavingsGoals([...savingsGoals, newSavingsGoal]);
    setNewGoal({
      name: "",
      targetAmount: "",
      currentAmount: "",
      deadline: "",
    });
    setIsCreating(false);
    
    toast({
      title: "Goal created",
      description: "Your new savings goal has been created.",
    });
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const formatCurrency = (amount: number) => {
    return `NGN ${amount.toLocaleString()}`;
  };

  const getRemainingDays = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    return `${diffDays} days left`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Savings Goals</h2>
          <p className="text-muted-foreground mt-1">
            Track and manage your savings goals
          </p>
        </div>
        
        <div className="flex space-x-4">
          <Button 
            variant={activeView === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("list")}
          >
            <BarChart3 className="mr-1 h-4 w-4" />
            List View
          </Button>
          
          <Button 
            variant={activeView === "chart" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("chart")}
          >
            <PieChart className="mr-1 h-4 w-4" />
            Chart View
          </Button>
          
          {!isCreating && (
            <Button onClick={() => setIsCreating(true)}>
              <PlusIcon className="mr-1 h-4 w-4" />
              New Goal
            </Button>
          )}
        </div>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Savings Goal</CardTitle>
            <CardDescription>
              Set up a new target for your financial aspirations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="goal-name" className="text-sm font-medium block mb-1">
                Goal Name
              </label>
              <Input
                id="goal-name"
                placeholder="e.g., Vacation Fund"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="target-amount" className="text-sm font-medium block mb-1">
                Target Amount (NGN)
              </label>
              <Input
                id="target-amount"
                type="number"
                placeholder="e.g., 500000"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="current-amount" className="text-sm font-medium block mb-1">
                Initial Amount (NGN, optional)
              </label>
              <Input
                id="current-amount"
                type="number"
                placeholder="e.g., 50000"
                value={newGoal.currentAmount}
                onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="deadline" className="text-sm font-medium block mb-1">
                Target Date
              </label>
              <Input
                id="deadline"
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateGoal}>
              Create Goal
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeView === "list" ? (
        <div className="grid gap-4 md:grid-cols-2">
          {savingsGoals.map((goal) => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            return (
              <Card key={goal.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>{goal.name}</CardTitle>
                  <CardDescription>
                    Target: {formatCurrency(goal.targetAmount)} • {getRemainingDays(goal.deadline)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pb-2">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>{formatCurrency(goal.currentAmount)}</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress
                      value={progress}
                      className="h-2"
                      indicatorClassName={goal.color}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Remaining: {formatCurrency(goal.targetAmount - goal.currentAmount)}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-${goal.color.split('-')[1]} text-${goal.color.split('-')[1]} hover:bg-${goal.color.split('-')[1]}/10`}
                    onClick={() => handleAddFunds(goal.id, 25000)}
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Funds
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Savings Progress Chart</CardTitle>
            <CardDescription>Visual representation of your savings goals</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px] flex items-center justify-center">
            {savingsGoals.length > 0 ? (
              <div className="w-full max-w-2xl">
                {savingsGoals.map((goal) => {
                  const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
                  return (
                    <div key={goal.id} className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{goal.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                        </span>
                      </div>
                      <div className="h-8 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${goal.color} transition-all duration-500 ease-in-out`}
                          style={{ width: `${progress}%` }}
                        >
                          <div className="h-full flex items-center justify-center text-white text-xs font-bold">
                            {progress}%
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>No savings goals found.</p>
                <Button variant="link" onClick={() => setIsCreating(true)}>
                  Create your first goal
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {savingsGoals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Savings Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h4 className="font-medium mb-1">50/30/20 Rule</h4>
              <p className="text-sm text-muted-foreground">
                Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
              </p>
            </div>
            
            <div className="rounded-md bg-muted p-4">
              <h4 className="font-medium mb-1">Automate Your Savings</h4>
              <p className="text-sm text-muted-foreground">
                Set up automatic transfers to your savings account on payday to ensure consistent saving.
              </p>
            </div>
            
            <div className="rounded-md bg-muted p-4">
              <h4 className="font-medium mb-1">Track Your Expenses</h4>
              <p className="text-sm text-muted-foreground">
                Monitor your spending to identify areas where you can cut back and save more.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SavingsSetup;
