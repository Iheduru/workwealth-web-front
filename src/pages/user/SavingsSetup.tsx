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
    color: "bg-indigo-500",
    deadline: "2026-01-01",
  },
  {
    id: "2",
    name: "Emergency Fund",
    targetAmount: 500000,
    currentAmount: 125000,
    color: "bg-emerald-500",
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
      "bg-indigo-500", 
      "bg-emerald-500", 
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 dark:from-white dark:via-emerald-100 dark:to-white bg-clip-text text-transparent">
              Savings Goals
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Track and manage your savings goals</p>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant={activeView === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("list")}
              className={activeView === "list" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white" : ""}
            >
              <BarChart3 className="mr-1 h-4 w-4" />
              List View
            </Button>
            
            <Button 
              variant={activeView === "chart" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("chart")}
              className={activeView === "chart" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white" : ""}
            >
              <PieChart className="mr-1 h-4 w-4" />
              Chart View
            </Button>
            
            {!isCreating && (
              <Button 
                onClick={() => setIsCreating(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <PlusIcon className="mr-1 h-4 w-4" />
                New Goal
              </Button>
            )}
          </div>
        </div>

        {isCreating && (
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">Create New Savings Goal</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Set up a new target for your financial aspirations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <label htmlFor="goal-name" className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Goal Name
                </label>
                <Input
                  id="goal-name"
                  placeholder="e.g., Vacation Fund"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                />
              </div>
              
              <div>
                <label htmlFor="target-amount" className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Target Amount (NGN)
                </label>
                <Input
                  id="target-amount"
                  type="number"
                  placeholder="e.g., 500000"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                />
              </div>
              
              <div>
                <label htmlFor="current-amount" className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Initial Amount (NGN, optional)
                </label>
                <Input
                  id="current-amount"
                  type="number"
                  placeholder="e.g., 50000"
                  value={newGoal.currentAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                />
              </div>
              
              <div>
                <label htmlFor="deadline" className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Target Date
                </label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
              <Button variant="ghost" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateGoal}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              >
                Create Goal
              </Button>
            </CardFooter>
          </Card>
        )}

        {activeView === "list" ? (
          <div className="grid gap-6 md:grid-cols-2">
            {savingsGoals.map((goal) => {
              const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
              return (
                <Card key={goal.id} className="group backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">{goal.name}</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Target: {formatCurrency(goal.targetAmount)} • {getRemainingDays(goal.deadline)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pb-4">
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{formatCurrency(goal.currentAmount)}</span>
                        <span className="font-bold text-slate-900 dark:text-white">{progress}%</span>
                      </div>
                      <Progress
                        value={progress}
                        className="h-3 bg-slate-200 dark:bg-slate-700"
                        indicatorClassName={`${goal.color} transition-all duration-500`}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Remaining: {formatCurrency(goal.targetAmount - goal.currentAmount)}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400`}
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
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">Savings Progress Chart</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Visual representation of your savings goals</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] flex items-center justify-center p-8">
              {savingsGoals.length > 0 ? (
                <div className="w-full max-w-3xl space-y-8">
                  {savingsGoals.map((goal) => {
                    const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
                    return (
                      <div key={goal.id} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-lg text-slate-900 dark:text-white">{goal.name}</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                          </span>
                        </div>
                        <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                          <div
                            className={`h-full ${goal.color} transition-all duration-1000 ease-out rounded-full relative overflow-hidden`}
                            style={{ width: `${progress}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                            <div className="h-full flex items-center justify-center text-white text-sm font-bold">
                              {progress}%
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PieChart className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">No savings goals found.</p>
                  <Button variant="link" onClick={() => setIsCreating(true)} className="text-emerald-600 hover:text-emerald-700 mt-2">
                    Create your first goal
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {savingsGoals.length > 0 && (
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">Savings Tips</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-6 border border-slate-200 dark:border-slate-600">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">50/30/20 Rule</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
                </p>
              </div>
              
              <div className="rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Automate Your Savings</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Set up automatic transfers to your savings account on payday to ensure consistent saving.
                </p>
              </div>
              
              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Track Your Expenses</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Monitor your spending to identify areas where you can cut back and save more.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SavingsSetup;
