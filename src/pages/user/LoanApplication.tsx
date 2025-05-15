
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Formik, Form, Field, FormikErrors } from "formik";
import * as yup from "yup";
import AlertBanner from "@/components/molecules/AlertBanner";

const loanSchema = yup.object().shape({
  amount: yup
    .number()
    .required("Loan amount is required")
    .min(5000, "Minimum loan amount is ₦5,000")
    .max(500000, "Maximum loan amount is ₦500,000"),
  term: yup.number().required("Loan term is required"),
  purpose: yup.string().required("Loan purpose is required"),
});

const LoanApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(3);
  const [activeTab, setActiveTab] = useState("apply");

  // Mock data
  const existingLoan = {
    id: "LN-2023-05-001",
    amount: 25000,
    term: 2,
    monthlyPayment: 13125,
    startDate: "April 15, 2023",
    nextPayment: "May 20, 2023",
    status: "active",
    progress: 50, // percent
  };

  const handleLoanSubmit = async (values: any) => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      toast({
        title: "Loan application submitted",
        description: "Your loan application is being processed.",
      });
      
      setActiveTab("status");
      setIsLoading(false);
    }, 1500);
  };

  const calculateMonthlyPayment = (amount: number, months: number) => {
    // Simple calculation with 5% monthly interest rate
    const interestRate = 0.05;
    return Math.round((amount / months) * (1 + interestRate));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Loans</h2>

      <Tabs defaultValue="apply" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
          <TabsTrigger value="status">Loan Status</TabsTrigger>
        </TabsList>

        <TabsContent value="apply" className="space-y-4 mt-6">
          <AlertBanner
            type="info"
            message="Your loan limit is based on your savings history and transaction patterns."
          />

          <Card>
            <CardHeader>
              <CardTitle>New Loan Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Formik
                initialValues={{
                  amount: loanAmount,
                  term: loanTerm,
                  purpose: "",
                }}
                validationSchema={loanSchema}
                onSubmit={handleLoanSubmit}
              >
                {({ errors, touched, setFieldValue, values }) => (
                  <Form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Loan Amount: {formatCurrency(loanAmount)}
                      </label>
                      <Slider
                        defaultValue={[loanAmount]}
                        min={5000}
                        max={500000}
                        step={5000}
                        onValueChange={(value) => {
                          setLoanAmount(value[0]);
                          setFieldValue("amount", value[0]);
                        }}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₦5,000</span>
                        <span>₦500,000</span>
                      </div>
                      {touched.amount && errors.amount ? (
                        <p className="text-sm text-red-500">{String(errors.amount)}</p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Loan Term: {loanTerm} {loanTerm === 1 ? "month" : "months"}
                      </label>
                      <Slider
                        defaultValue={[loanTerm]}
                        min={1}
                        max={12}
                        step={1}
                        onValueChange={(value) => {
                          setLoanTerm(value[0]);
                          setFieldValue("term", value[0]);
                        }}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 month</span>
                        <span>12 months</span>
                      </div>
                      {touched.term && errors.term ? (
                        <p className="text-sm text-red-500">{String(errors.term)}</p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Loan Purpose</label>
                      <Field name="purpose">
                        {({ field }: { field: any }) => (
                          <Select
                            value={field.value}
                            onValueChange={(value) => setFieldValue("purpose", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="business">Business Expansion</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="emergency">Emergency</SelectItem>
                              <SelectItem value="medical">Medical</SelectItem>
                              <SelectItem value="personal">Personal</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      {touched.purpose && errors.purpose ? (
                        <p className="text-sm text-red-500">{String(errors.purpose)}</p>
                      ) : null}
                    </div>

                    <Card className="bg-muted/40 border-dashed">
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Loan Amount:</span>
                            <span className="font-medium">{formatCurrency(loanAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Monthly Payment:</span>
                            <span className="font-medium">
                              {formatCurrency(calculateMonthlyPayment(loanAmount, loanTerm))}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Total Repayment:</span>
                            <span className="font-medium">
                              {formatCurrency(calculateMonthlyPayment(loanAmount, loanTerm) * loanTerm)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Interest Rate:</span>
                            <span className="font-medium">5% monthly</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        className="w-full bg-ww-purple-500 hover:bg-ww-purple-600"
                        disabled={isLoading}
                      >
                        {isLoading ? "Processing..." : "Apply for Loan"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4 mt-6">
          {existingLoan ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Loan #{existingLoan.id}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Started on {existingLoan.startDate}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    existingLoan.status === "active"
                      ? "bg-ww-green-100 text-ww-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {existingLoan.status === "active" ? "Active" : "Pending"}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Loan Amount:</span>
                    <span className="font-medium">{formatCurrency(existingLoan.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Term:</span>
                    <span className="font-medium">
                      {existingLoan.term} {existingLoan.term === 1 ? "month" : "months"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Payment:</span>
                    <span className="font-medium">{formatCurrency(existingLoan.monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Next Payment:</span>
                    <span className="font-medium">{existingLoan.nextPayment}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Repayment Progress</span>
                    <span className="font-medium">{existingLoan.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ww-green-500 rounded-full"
                      style={{ width: `${existingLoan.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Download statement",
                        description: "Your loan statement would download in a real app.",
                      });
                    }}
                  >
                    Download Statement
                  </Button>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Make an early repayment",
                        description: "This would open a repayment modal in production.",
                      });
                    }}
                  >
                    Make Repayment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No Active Loans</h3>
              <p className="text-muted-foreground mb-6">
                You don't have any active loans at the moment.
              </p>
              <Button onClick={() => setActiveTab("apply")}>
                Apply for a Loan
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoanApplication;
