
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
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Formik, Form, Field } from "formik";
import { Loader, AlertCircle, Calendar, CreditCard, Banknote, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as yup from "yup";

// Define schema for loan application
const loanSchema = yup.object().shape({
  amount: yup.number()
    .required("Loan amount is required")
    .positive("Must be a positive amount")
    .min(5000, "Minimum loan amount is ₦5,000")
    .max(500000, "Maximum loan amount is ₦500,000"),
  purpose: yup.string().required("Loan purpose is required"),
  duration: yup.number()
    .required("Loan duration is required")
    .positive("Duration must be positive")
    .min(1, "Minimum duration is 1 month")
    .max(24, "Maximum duration is 24 months"),
});

const LoanApplication: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loanStatus, setLoanStatus] = useState<"idle" | "submitting" | "approved" | "rejected">("idle");
  const [sliderValue, setSliderValue] = useState([50000]);
  const [repaymentSchedule, setRepaymentSchedule] = useState<any[]>([]);
  
  // Interest rate for the loan (monthly)
  const interestRate = 0.05; // 5% per month
  
  // Calculate monthly payment
  const calculateMonthlyPayment = (principal: number, months: number, rate: number) => {
    // Simple interest calculation for demo purposes
    const totalInterest = principal * rate * months;
    const totalAmount = principal + totalInterest;
    return totalAmount / months;
  };
  
  // Generate repayment schedule
  const generateRepaymentSchedule = (principal: number, months: number) => {
    const monthlyPayment = calculateMonthlyPayment(principal, months, interestRate);
    const schedule = [];
    let remainingPrincipal = principal;
    const now = new Date();
    
    for (let i = 1; i <= months; i++) {
      const paymentDate = new Date(now);
      paymentDate.setMonth(now.getMonth() + i);
      
      const interestForMonth = remainingPrincipal * interestRate;
      const principalForMonth = monthlyPayment - interestForMonth;
      
      remainingPrincipal -= principalForMonth;
      
      schedule.push({
        month: i,
        date: paymentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        payment: monthlyPayment,
        principal: principalForMonth,
        interest: interestForMonth,
        balance: Math.max(0, remainingPrincipal),
      });
    }
    
    return schedule;
  };
  
  // Handle loan application submission
  const handleApplyForLoan = async (values: any) => {
    setIsSubmitting(true);
    setLoanStatus("submitting");
    
    // Generate repayment schedule for display
    const schedule = generateRepaymentSchedule(values.amount, values.duration);
    setRepaymentSchedule(schedule);
    
    // Mock API call
    setTimeout(() => {
      // For demo purposes, approve loans under 300k and reject higher amounts
      if (values.amount <= 300000) {
        setLoanStatus("approved");
        toast({
          title: "Loan application successful!",
          description: `Your loan of ₦${values.amount.toLocaleString()} has been pre-approved.`,
        });
      } else {
        setLoanStatus("rejected");
        toast({
          title: "Loan application requires review",
          description: "Our team will review your application and get back to you within 24 hours.",
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    }, 3000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Loan Application</h2>
        <Button 
          variant="outline" 
          className="mt-4 sm:mt-0" 
          onClick={() => window.location.href = "/loan/history"}
        >
          View Loan History
        </Button>
      </div>
      
      <Tabs defaultValue="apply" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
          <TabsTrigger value="status">Application Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apply" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Apply for a New Loan</CardTitle>
                <CardDescription>
                  Complete the form below to apply for a personal loan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Formik
                  initialValues={{ amount: 50000, purpose: "", duration: 6 }}
                  validationSchema={loanSchema}
                  onSubmit={handleApplyForLoan}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="amount">Loan Amount (₦)</Label>
                          <div className="pt-5 pb-4">
                            <Slider 
                              value={[values.amount]} 
                              min={5000} 
                              max={500000}
                              step={5000}
                              onValueChange={(val) => {
                                setFieldValue("amount", val[0]);
                                setSliderValue(val);
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">₦5,000</span>
                            <span className="font-semibold">₦{values.amount.toLocaleString()}</span>
                            <span className="text-sm text-muted-foreground">₦500,000</span>
                          </div>
                          {errors.amount && touched.amount && (
                            <p className="text-sm text-red-500 mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" /> {String(errors.amount)}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="purpose">Loan Purpose</Label>
                          <Field name="purpose">
                            {({ field, form }: any) => (
                              <Select
                                value={field.value}
                                onValueChange={(value) => form.setFieldValue("purpose", value)}
                              >
                                <SelectTrigger className="mt-1.5">
                                  <SelectValue placeholder="Select a purpose" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="business">Business</SelectItem>
                                  <SelectItem value="education">Education</SelectItem>
                                  <SelectItem value="medical">Medical Expenses</SelectItem>
                                  <SelectItem value="house_rent">House Rent</SelectItem>
                                  <SelectItem value="personal">Personal</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          </Field>
                          {errors.purpose && touched.purpose && (
                            <p className="text-sm text-red-500 mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" /> {String(errors.purpose)}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="duration">
                            Loan Duration (Months): <span className="font-semibold">{values.duration}</span>
                          </Label>
                          <div className="pt-5 pb-4">
                            <Slider 
                              value={[values.duration]} 
                              min={1} 
                              max={24}
                              step={1}
                              onValueChange={(val) => setFieldValue("duration", val[0])}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">1 month</span>
                            <span className="text-sm text-muted-foreground">24 months</span>
                          </div>
                          {errors.duration && touched.duration && (
                            <p className="text-sm text-red-500 mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" /> {String(errors.duration)}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Apply for Loan"
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Loan Summary</CardTitle>
                <CardDescription>
                  Estimated costs and repayment details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Principal Amount:</span>
                    <span className="font-medium">₦{sliderValue[0]?.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interest Rate:</span>
                    <span className="font-medium">{(interestRate * 100).toFixed(1)}% monthly</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Processing Fee:</span>
                    <span className="font-medium">₦{(sliderValue[0] * 0.01).toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Monthly Payment:</span>
                      <span className="font-bold">
                        ₦{calculateMonthlyPayment(sliderValue[0], 6, interestRate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium">Total Repayment:</span>
                      <span className="font-semibold">
                        ₦{(calculateMonthlyPayment(sliderValue[0], 6, interestRate) * 6).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Eligibility Score</h4>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Your credit score and financial health makes you eligible for loans up to ₦300,000
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">What you need to know:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Loans are approved within 24 hours</li>
                    <li>• Early repayment is allowed without penalties</li>
                    <li>• Maximum loan amount depends on your credit score</li>
                    <li>• Late payment attracts 1% daily charge</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="status" className="pt-4">
          {loanStatus === "idle" ? (
            <Card className="border-dashed">
              <CardContent className="py-10">
                <div className="text-center space-y-2">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="font-medium text-lg">No Active Application</h3>
                  <p className="text-muted-foreground">
                    You don't have any active loan applications. Apply for a loan to see its status here.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      // Fix: don't use click() method directly
                      const applyTab = document.querySelector('[data-value="apply"]');
                      if (applyTab instanceof HTMLElement) {
                        applyTab.click();
                      }
                    }}
                    className="mt-4"
                  >
                    Start New Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : loanStatus === "submitting" ? (
            <Card>
              <CardHeader>
                <CardTitle>Processing Your Application</CardTitle>
                <CardDescription>
                  Please wait while we review your loan application
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-10">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-4 border-muted border-t-ww-purple-500 animate-spin"></div>
                  <CreditCard className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                <p className="text-center text-muted-foreground mt-6">
                  We're checking your eligibility and processing your application. This should take a few moments.
                </p>
                <div className="w-full mt-8 max-w-md">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Verifying information</span>
                      <span>Complete</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Checking credit score</span>
                      <span>In Progress</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Decision</span>
                      <span>Pending</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className={`${loanStatus === "approved" ? "border-ww-green-500" : "border-red-500"} border-2`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Loan Application {loanStatus === "approved" ? "Pre-Approved" : "Needs Review"}</CardTitle>
                      <CardDescription>
                        {loanStatus === "approved" 
                          ? "Your loan has been pre-approved. Review the details below." 
                          : "Your application requires additional review by our team."}
                      </CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${loanStatus === "approved" ? "bg-ww-green-100" : "bg-red-100"}`}>
                      {loanStatus === "approved" ? (
                        <CheckCircle2 className="h-6 w-6 text-ww-green-500" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <h4 className="text-sm text-muted-foreground">Loan Amount</h4>
                      <p className="text-lg font-bold">₦{sliderValue[0]?.toLocaleString()}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm text-muted-foreground">Monthly Repayment</h4>
                      <p className="text-lg font-bold">
                        ₦{calculateMonthlyPayment(sliderValue[0], 6, interestRate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm text-muted-foreground">Duration</h4>
                      <p className="text-lg font-medium">6 months</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm text-muted-foreground">Interest Rate</h4>
                      <p className="text-lg font-medium">{(interestRate * 100).toFixed(1)}% monthly</p>
                    </div>
                  </div>
                  
                  {loanStatus === "approved" ? (
                    <div>
                      <h3 className="font-medium mb-3">Next Steps:</h3>
                      <ol className="space-y-2 text-sm pl-5 list-decimal">
                        <li>Review your repayment schedule below</li>
                        <li>Accept the loan offer by clicking the button</li>
                        <li>Funds will be disbursed to your wallet within 30 minutes</li>
                      </ol>
                      
                      <Button className="w-full mt-6">
                        Accept Loan Offer
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-medium mb-3">Why additional review is needed:</h3>
                      <ul className="space-y-2 text-sm pl-5 list-disc">
                        <li>The requested loan amount exceeds your current eligibility limit</li>
                        <li>We need to verify additional information</li>
                      </ul>
                      
                      <div className="bg-muted p-4 rounded-md mt-4">
                        <p className="text-sm">Our team will contact you within 24 hours to discuss your application and options. You may also provide additional documents to support your application.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <Button variant="outline">
                          Upload Documents
                        </Button>
                        <Button>
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {loanStatus === "approved" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Repayment Schedule</CardTitle>
                    <CardDescription>
                      Your monthly payments and due dates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <table className="min-w-full divide-y divide-border">
                        <thead className="bg-muted/50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Payment Date
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Principal
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Interest
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Payment
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Balance
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {repaymentSchedule.map((payment, i) => (
                            <tr key={i}>
                              <td className="px-4 py-3 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                  {payment.date}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-right">
                                ₦{payment.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-4 py-3 text-sm text-right">
                                ₦{payment.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-right">
                                ₦{payment.payment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-4 py-3 text-sm text-right">
                                ₦{payment.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Early repayment is allowed without penalties. Contact customer support for more information.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoanApplication;
