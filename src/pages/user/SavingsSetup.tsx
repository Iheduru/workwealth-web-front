
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PiggyBank, Target, Coins, ArrowRight, Calendar as CalendarIcon2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

// Define schemas for different savings types
const regularSavingsSchema = yup.object().shape({
  name: yup.string().required("Plan name is required"),
  amount: yup.number()
    .required("Amount is required")
    .positive("Must be a positive amount")
    .min(100, "Minimum amount is 100"),
  frequency: yup.string().required("Frequency is required"),
  targetAmount: yup.number()
    .required("Target amount is required")
    .positive("Must be a positive amount")
    .min(1000, "Target amount must be at least 1000"),
});

const targetSavingsSchema = yup.object().shape({
  name: yup.string().required("Goal name is required"),
  targetAmount: yup.number()
    .required("Target amount is required")
    .positive("Must be a positive amount")
    .min(1000, "Target amount must be at least 1000"),
  endDate: yup.date()
    .required("Target date is required")
    .min(new Date(), "Date must be in the future"),
  initialDeposit: yup.number()
    .required("Initial deposit is required")
    .positive("Must be a positive amount")
    .min(100, "Minimum initial deposit is 100"),
});

const SavingsSetup: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate(); // Add this line to use navigation
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [createdPlanDetails, setCreatedPlanDetails] = useState<any>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleCreateRegularSavings = (values: any) => {
    // In a real app, this would call an API to create the savings plan
    console.log("Creating regular savings plan:", values);
    
    // Mock creation success
    setCreatedPlanDetails({
      type: "Regular",
      name: values.name,
      amount: values.amount,
      frequency: values.frequency,
      targetAmount: values.targetAmount,
      estimatedCompletion: calculateEstimatedCompletion(values.amount, values.frequency, values.targetAmount),
    });
    
    setIsSuccessDialogOpen(true);
  };

  const handleCreateTargetSavings = (values: any) => {
    // In a real app, this would call an API to create the savings plan
    console.log("Creating target savings:", values);
    
    // Mock creation success
    setCreatedPlanDetails({
      type: "Target",
      name: values.name,
      targetAmount: values.targetAmount,
      endDate: format(values.endDate, "PPP"),
      initialDeposit: values.initialDeposit,
      requiredMonthlyAmount: calculateRequiredMonthly(values.targetAmount, values.initialDeposit, values.endDate),
    });
    
    setIsSuccessDialogOpen(true);
  };

  // Helper function to estimate completion time
  const calculateEstimatedCompletion = (amount: number, frequency: string, targetAmount: number) => {
    let periodsNeeded: number;
    let periodType: string;
    
    switch (frequency) {
      case "daily":
        periodsNeeded = Math.ceil(targetAmount / amount);
        periodType = periodsNeeded === 1 ? "day" : "days";
        break;
      case "weekly":
        periodsNeeded = Math.ceil(targetAmount / amount);
        periodType = periodsNeeded === 1 ? "week" : "weeks";
        break;
      case "monthly":
        periodsNeeded = Math.ceil(targetAmount / amount);
        periodType = periodsNeeded === 1 ? "month" : "months";
        break;
      default:
        return "Unknown";
    }
    
    return `${periodsNeeded} ${periodType}`;
  };

  // Helper function to calculate required monthly savings to reach target
  const calculateRequiredMonthly = (targetAmount: number, initialDeposit: number, endDate: Date) => {
    const today = new Date();
    const monthsDiff = (endDate.getFullYear() - today.getFullYear()) * 12 + 
                       (endDate.getMonth() - today.getMonth());
    const remainingAmount = targetAmount - initialDeposit;
    
    if (monthsDiff <= 0) return targetAmount;
    return Math.ceil(remainingAmount / monthsDiff);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Savings Plans</h2>
        <Button variant="outline" className="mt-4 sm:mt-0" onClick={() => navigate("/savings/history")}>
          View Existing Plans
        </Button>
      </div>
      
      <Tabs defaultValue="regular" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="regular">Regular Savings</TabsTrigger>
          <TabsTrigger value="target">Target Savings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="regular" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center sm:text-left">Set Up Regular Savings</CardTitle>
              <CardDescription className="text-center sm:text-left">
                Automatically save a fixed amount on a schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={{
                  name: "",
                  amount: 1000,
                  frequency: "monthly",
                  targetAmount: 10000,
                }}
                validationSchema={regularSavingsSchema}
                onSubmit={handleCreateRegularSavings}
              >
                {({ values, errors, touched, isSubmitting }) => (
                  <Form className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Plan Name</Label>
                          <Field
                            as={Input}
                            id="name"
                            name="name"
                            placeholder="E.g., Emergency Fund"
                          />
                          {errors.name && touched.name && (
                            <p className="text-sm text-red-500 mt-1">{String(errors.name)}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="frequency">Savings Frequency</Label>
                          <Field name="frequency">
                            {({ field, form }: any) => (
                              <Select
                                value={field.value}
                                onValueChange={(value) => form.setFieldValue("frequency", value)}
                              >
                                <SelectTrigger>
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
                          {errors.frequency && touched.frequency && (
                            <p className="text-sm text-red-500 mt-1">{String(errors.frequency)}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="amount">Amount (₦)</Label>
                          <Field
                            as={Input}
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder="1000"
                          />
                          {errors.amount && touched.amount && (
                            <p className="text-sm text-red-500 mt-1">{String(errors.amount)}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="targetAmount">Target Amount (₦)</Label>
                          <Field
                            as={Input}
                            id="targetAmount"
                            name="targetAmount"
                            type="number"
                            placeholder="10000"
                          />
                          {errors.targetAmount && touched.targetAmount && (
                            <p className="text-sm text-red-500 mt-1">{String(errors.targetAmount)}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-md">
                        <div className="text-sm font-medium mb-2">Savings Estimate</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center">
                            <Coins className="h-4 w-4 mr-2 text-ww-purple-500" />
                            <span className="text-sm">Each {values.frequency} payment:</span>
                          </div>
                          <div className="text-sm font-medium">₦ {Number(values.amount).toLocaleString()}</div>
                          
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-2 text-ww-purple-500" />
                            <span className="text-sm">Goal amount:</span>
                          </div>
                          <div className="text-sm font-medium">₦ {Number(values.targetAmount).toLocaleString()}</div>
                          
                          <div className="flex items-center">
                            <CalendarIcon2 className="h-4 w-4 mr-2 text-ww-purple-500" />
                            <span className="text-sm">Estimated completion:</span>
                          </div>
                          <div className="text-sm font-medium">
                            {calculateEstimatedCompletion(
                              Number(values.amount),
                              values.frequency,
                              Number(values.targetAmount)
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      Create Regular Savings Plan
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="target" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center sm:text-left">Set Up Target Savings</CardTitle>
              <CardDescription className="text-center sm:text-left">
                Save towards a goal with a specific target date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={{
                  name: "",
                  targetAmount: 100000,
                  endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
                  initialDeposit: 10000,
                }}
                validationSchema={targetSavingsSchema}
                onSubmit={handleCreateTargetSavings}
              >
                {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                  <Form className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Goal Name</Label>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          placeholder="E.g., New Car, House Down Payment"
                        />
                        {errors.name && touched.name && (
                          <p className="text-sm text-red-500 mt-1">{String(errors.name)}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="targetAmount">Target Amount (₦)</Label>
                          <Field
                            as={Input}
                            id="targetAmount"
                            name="targetAmount"
                            type="number"
                            placeholder="100000"
                          />
                          {errors.targetAmount && touched.targetAmount && (
                            <p className="text-sm text-red-500 mt-1">{String(errors.targetAmount)}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="endDate">Target Date</Label>
                          <div className="mt-1">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !values.endDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {values.endDate ? format(values.endDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={values.endDate}
                                  onSelect={(date) => {
                                    if (date) {
                                      setFieldValue("endDate", date);
                                    }
                                  }}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          {errors.endDate && touched.endDate && (
                            <p className="text-sm text-red-500 mt-1">{String(errors.endDate)}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="initialDeposit">Initial Deposit (₦)</Label>
                        <Field
                          as={Input}
                          id="initialDeposit"
                          name="initialDeposit"
                          type="number"
                          placeholder="10000"
                        />
                        {errors.initialDeposit && touched.initialDeposit && (
                          <p className="text-sm text-red-500 mt-1">{String(errors.initialDeposit)}</p>
                        )}
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-md">
                        <div className="text-sm font-medium mb-2">Savings Plan Summary</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center">
                            <PiggyBank className="h-4 w-4 mr-2 text-ww-purple-500" />
                            <span className="text-sm">Initial deposit:</span>
                          </div>
                          <div className="text-sm font-medium">₦ {Number(values.initialDeposit).toLocaleString()}</div>
                          
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-2 text-ww-purple-500" />
                            <span className="text-sm">Goal amount:</span>
                          </div>
                          <div className="text-sm font-medium">₦ {Number(values.targetAmount).toLocaleString()}</div>
                          
                          <div className="flex items-center">
                            <ArrowRight className="h-4 w-4 mr-2 text-ww-purple-500" />
                            <span className="text-sm">Recommended monthly:</span>
                          </div>
                          <div className="text-sm font-medium">
                            ₦ {calculateRequiredMonthly(
                              Number(values.targetAmount),
                              Number(values.initialDeposit),
                              values.endDate
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      Create Target Savings Plan
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <AlertDialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Savings Plan Created!</AlertDialogTitle>
            <AlertDialogDescription>
              Your {createdPlanDetails?.type.toLowerCase()} savings plan has been created successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {createdPlanDetails && (
            <div className="py-4">
              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium mb-2">{createdPlanDetails.name}</p>
                
                {createdPlanDetails.type === "Regular" ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span>₦ {Number(createdPlanDetails.amount).toLocaleString()} / {createdPlanDetails.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target:</span>
                      <span>₦ {Number(createdPlanDetails.targetAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated completion:</span>
                      <span>{createdPlanDetails.estimatedCompletion}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Target amount:</span>
                      <span>₦ {Number(createdPlanDetails.targetAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target date:</span>
                      <span>{createdPlanDetails.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Required monthly:</span>
                      <span>₦ {Number(createdPlanDetails.requiredMonthlyAmount).toLocaleString()}</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Your first payment will be processed shortly. You can manage your savings plans from the dashboard.
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <AlertDialogFooter>
            <Button onClick={() => setIsSuccessDialogOpen(false)}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SavingsSetup;
