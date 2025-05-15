import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import {
  PlusIcon,
  Trash2Icon,
  PieChartIcon,
} from "lucide-react";

const savingsSchema = yup.object().shape({
  name: yup.string().required("Plan name is required"),
  target: yup
    .number()
    .required("Target amount is required")
    .min(10000, "Minimum target is ₦10,000"),
  frequency: yup.string().required("Frequency is required"),
  amount: yup
    .number()
    .required("Contribution amount is required")
    .min(1000, "Minimum contribution is ₦1,000"),
});

const SavingsSetup = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const [savingsPlans] = useState([
    {
      id: 1,
      name: "House Fund",
      target: 2500000,
      current: 1500000,
      progress: 60,
      frequency: "monthly",
      amount: 50000,
    },
    {
      id: 2,
      name: "Emergency Fund",
      target: 500000,
      current: 125000,
      progress: 25,
      frequency: "weekly",
      amount: 10000,
    },
  ]);

  const handleSavingsSubmit = async (values: any) => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      toast({
        title: "Savings plan created",
        description: "Your new savings plan has been set up successfully.",
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return "Daily";
      case "weekly":
        return "Weekly";
      case "monthly":
        return "Monthly";
      default:
        return frequency;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Savings</h2>

      <Tabs defaultValue="plans">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plans">My Savings Plans</TabsTrigger>
          <TabsTrigger value="create">Create New Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {savingsPlans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatCurrency(plan.current)} saved of {formatCurrency(plan.target)} target
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          toast({
                            title: "Delete savings plan",
                            description: "This would open a confirmation modal in production.",
                          });
                        }}
                      >
                        <Trash2Icon className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{plan.progress}%</span>
                    </div>
                    <Progress value={plan.progress} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Frequency</p>
                      <p className="font-medium">{getFrequencyText(plan.frequency)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="font-medium">{formatCurrency(plan.amount)}</p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-ww-purple-500 hover:bg-ww-purple-600"
                    onClick={() => {
                      toast({
                        title: "Add funds",
                        description: "This would open a contribution modal in production.",
                      });
                    }}
                  >
                    Make Contribution
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed border-2">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mb-4">
                  <PlusIcon className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-lg mb-1">Create New Plan</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Set savings goals and contribute regularly
                </p>
                <Button
                  variant="outline"
                  className="border-ww-purple-200 text-ww-purple-700 hover:bg-ww-purple-50"
                  onClick={() => {
                    const tabsElement = document.querySelector('[value="create"]') as HTMLElement;
                    tabsElement?.click();
                  }}
                >
                  Start New Plan
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChartIcon className="mr-2 h-5 w-5" />
                Savings Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Savings</span>
                    <span className="font-medium">
                      {formatCurrency(
                        savingsPlans.reduce((sum, plan) => sum + plan.current, 0)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Target</span>
                    <span className="font-medium">
                      {formatCurrency(
                        savingsPlans.reduce((sum, plan) => sum + plan.target, 0)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span className="font-medium">
                      {Math.round(
                        (savingsPlans.reduce((sum, plan) => sum + plan.current, 0) /
                          savingsPlans.reduce((sum, plan) => sum + plan.target, 0)) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>

                <Progress
                  value={Math.round(
                    (savingsPlans.reduce((sum, plan) => sum + plan.current, 0) /
                      savingsPlans.reduce((sum, plan) => sum + plan.target, 0)) *
                      100
                  )}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Savings Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={{
                  name: "",
                  target: 100000,
                  frequency: "monthly",
                  amount: 10000,
                }}
                validationSchema={savingsSchema}
                onSubmit={handleSavingsSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium" htmlFor="name">
                        Plan Name
                      </label>
                      <Field name="name">
                        {({ field }: { field: any }) => (
                          <Input
                            {...field}
                            id="name"
                            placeholder="e.g., House Fund, Emergency Fund"
                            className="mt-1"
                          />
                        )}
                      </Field>
                      {touched.name && errors.name && (
                        <p className="text-sm text-red-500 mt-1">{String(errors.name)}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium" htmlFor="target">
                        Target Amount (₦)
                      </label>
                      <Field name="target">
                        {({ field }: { field: any }) => (
                          <Input
                            {...field}
                            id="target"
                            type="number"
                            placeholder="100000"
                            className="mt-1"
                          />
                        )}
                      </Field>
                      {touched.target && errors.target && (
                        <p className="text-sm text-red-500 mt-1">{String(errors.target)}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium" htmlFor="frequency">
                        Contribution Frequency
                      </label>
                      <Field name="frequency">
                        {({ field, form }: { field: any; form: any }) => (
                          <Select
                            value={field.value}
                            onValueChange={(value) =>
                              form.setFieldValue("frequency", value)
                            }
                          >
                            <SelectTrigger id="frequency" className="mt-1">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      {touched.frequency && errors.frequency && (
                        <p className="text-sm text-red-500 mt-1">{String(errors.frequency)}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium" htmlFor="amount">
                        Contribution Amount (₦)
                      </label>
                      <Field name="amount">
                        {({ field }: { field: any }) => (
                          <Input
                            {...field}
                            id="amount"
                            type="number"
                            placeholder="10000"
                            className="mt-1"
                          />
                        )}
                      </Field>
                      {touched.amount && errors.amount && (
                        <p className="text-sm text-red-500 mt-1">{String(errors.amount)}</p>
                      )}
                    </div>

                    <Field name="amount">
                      {({ field }: { field: any }) => (
                        <Card className="bg-muted/40 border-dashed mt-4">
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Each contribution:</span>
                                <span className="font-medium">
                                  {formatCurrency(Number(field.value) || 0)}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Estimated completion:</span>
                                <span className="font-medium">
                                  {Math.ceil(
                                    Number(touched.target ? field.value : 100000) /
                                      Number(field.value || 10000)
                                  )}{" "}
                                  months
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Field>

                    <Button
                      type="submit"
                      className="w-full bg-ww-purple-500 hover:bg-ww-purple-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating..." : "Create Savings Plan"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavingsSetup;
