
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { AlertTriangle, Upload, Check, Clock, ChevronRight } from "lucide-react";
import AlertBanner from "@/components/molecules/AlertBanner";
import InputWithIcon from "@/components/molecules/InputWithIcon";
import FormLabel from "@/components/atoms/FormLabel";
import { motion } from "framer-motion";

const kycSchema = yup.object().shape({
  id_number: yup.string().required("ID number is required"),
  bvn: yup.string()
    .required("BVN is required")
    .matches(/^[0-9]{11}$/, "BVN must be exactly 11 digits"),
});

const Kyc = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [idCardUploaded, setIdCardUploaded] = useState(false);
  const [idCardError, setIdCardError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [kycComplete, setKycComplete] = useState(false);
  const [kycData, setKycData] = useState<{
    id_number: string;
    bvn: string;
  }>({ id_number: "", bvn: "" });

  const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setIdCardError("");
    
    if (!file) {
      setIdCardError("Please select a file");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setIdCardError("File size must be less than 5MB");
      return;
    }
    
    // Mock upload process
    setIsLoading(true);
    setIdCardFile(file);
    
    setTimeout(() => {
      setIdCardUploaded(true);
      setIsLoading(false);
      toast({
        title: "ID uploaded",
        description: "Your ID card has been uploaded successfully",
      });
    }, 1500);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !idCardUploaded) {
      setIdCardError("Please upload your ID card");
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleKycSubmit = async (values: { id_number: string; bvn: string }) => {
    if (!idCardUploaded) {
      setIdCardError("Please upload your ID card");
      return;
    }
    
    setIsLoading(true);
    setKycData(values);
    
    // Mock API call
    setTimeout(() => {
      setKycComplete(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleFinishKyc = () => {
    toast({
      title: "KYC verification submitted",
      description: "We'll review your information and get back to you soon."
    });
    
    navigate("/dashboard");
  };

  const steps = [
    {
      title: "Upload ID",
      description: "Upload a government-issued ID card"
    },
    {
      title: "Verification Details",
      description: "Provide your verification numbers"
    },
    {
      title: "Review & Submit",
      description: "Review and submit your KYC information"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Complete Your KYC</h1>
        <p className="text-muted-foreground mt-1">
          We need a few more details to verify your identity
        </p>
      </div>

      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center"
              style={{ width: `${100 / steps.length}%` }}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium relative
                ${index + 1 === currentStep 
                  ? 'bg-ww-purple-500 text-white' 
                  : index + 1 < currentStep 
                    ? 'bg-ww-green-500 text-white' 
                    : 'bg-gray-100 text-gray-500'
                }
              `}>
                {index + 1 < currentStep ? (
                  <Check size={18} />
                ) : (
                  index + 1
                )}
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div 
                    className="absolute left-full top-1/2 h-0.5 -translate-y-1/2 flex items-center"
                    style={{ width: 'calc(100% - 2.5rem)' }}
                  >
                    <div 
                      className={`h-full bg-gray-200 transition-all duration-300 ${
                        index + 1 < currentStep ? 'bg-ww-green-500' : ''
                      }`} 
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                )}
              </div>
              <p className="text-xs text-center mt-2">{step.title}</p>
            </div>
          ))}
        </div>
      </div>

      <AlertBanner
        type="info"
        message="Your identity verification helps us comply with regulations and protect your account."
        className="mb-6"
      />

      {/* Step content */}
      {kycComplete ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 rounded-full bg-ww-green-100 flex items-center justify-center text-ww-green-500 mx-auto mb-4">
            <Check size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">KYC Submitted Successfully</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for submitting your KYC. Our team will review your information and update your account soon.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b pb-2 mb-2">
              <span className="text-muted-foreground">ID Number:</span>
              <span className="font-medium">{kycData.id_number}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">BVN:</span>
              <span className="font-medium">{kycData.bvn}</span>
            </div>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500 mr-3">
              <Clock size={18} />
            </div>
            <p className="text-sm text-muted-foreground">
              Verification typically takes 24-48 hours
            </p>
          </div>
          <Button onClick={handleFinishKyc} className="bg-ww-purple-500 hover:bg-ww-purple-600">
            Continue to Dashboard
          </Button>
        </motion.div>
      ) : (
        <>
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="text-lg font-medium mb-4">Upload Your ID Card</h2>
                  
                  <div className="border-2 border-dashed border-muted rounded-md p-6 text-center">
                    {!idCardUploaded ? (
                      <>
                        <div className="mb-4">
                          <div className="mx-auto w-12 h-12 rounded-full bg-ww-purple-100 flex items-center justify-center text-ww-purple-500">
                            <Upload size={24} />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag & drop your ID card image here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supported formats: JPG, PNG, PDF (Max 5MB)
                        </p>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleIdUpload}
                          disabled={isLoading}
                        />
                      </>
                    ) : (
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-ww-green-100 flex items-center justify-center text-ww-green-500 mr-3">
                          <Check size={20} />
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium">{idCardFile?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {idCardFile ? `${Math.round(idCardFile.size / 1024)} KB` : ""}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIdCardUploaded(false);
                            setIdCardFile(null);
                          }}
                        >
                          Change
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {idCardError && (
                    <p className="text-sm text-red-500 mt-2 flex items-center">
                      <AlertTriangle size={16} className="mr-1" /> {idCardError}
                    </p>
                  )}

                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Your ID will be used only for verification purposes and kept secure
                      </p>
                    </div>
                    <Button 
                      onClick={handleNextStep} 
                      className="bg-ww-purple-500 hover:bg-ww-purple-600"
                      disabled={isLoading}
                    >
                      Next
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-medium mb-2">Acceptable ID types:</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>National ID Card</li>
                  <li>International Passport</li>
                  <li>Driver's License</li>
                  <li>Voter's Card</li>
                </ul>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Formik
                initialValues={{ id_number: "", bvn: "" }}
                validationSchema={kycSchema}
                onSubmit={handleKycSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    <div>
                      <FormLabel htmlFor="id_number" required>National ID Number</FormLabel>
                      <Field
                        as={Input}
                        id="id_number"
                        name="id_number"
                        placeholder="Enter your National ID Number"
                        disabled={isLoading}
                      />
                      {touched.id_number && errors.id_number && (
                        <p className="text-sm text-red-500 mt-1">{errors.id_number}</p>
                      )}
                    </div>
                    
                    <div>
                      <FormLabel htmlFor="bvn" required>Bank Verification Number (BVN)</FormLabel>
                      <Field
                        as={Input}
                        id="bvn"
                        name="bvn"
                        placeholder="Enter your 11-digit BVN"
                        disabled={isLoading}
                      />
                      {touched.bvn && errors.bvn && (
                        <p className="text-sm text-red-500 mt-1">{errors.bvn}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Your BVN is a unique number that helps us verify your banking details
                      </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded p-4 text-amber-800 text-sm my-4">
                      <div className="flex items-start">
                        <AlertTriangle className="mr-2 h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Important</p>
                          <p className="text-amber-700">
                            Please ensure all the information provided matches your official documents. 
                            Incorrect information may lead to verification failure.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevStep}
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                      <Button 
                        type="button"
                        className="bg-ww-purple-500 hover:bg-ww-purple-600" 
                        onClick={handleNextStep}
                        disabled={isLoading}
                      >
                        Next
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="text-lg font-medium mb-4">Review Your Information</h2>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="text-sm font-medium mb-2">ID Card</h3>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-ww-green-100 flex items-center justify-center text-ww-green-500 mr-2">
                          <Check size={16} />
                        </div>
                        <span className="text-sm">{idCardFile?.name || "ID Card Uploaded"}</span>
                      </div>
                    </div>

                    <Formik
                      initialValues={{ id_number: "", bvn: "" }}
                      validationSchema={kycSchema}
                      onSubmit={handleKycSubmit}
                    >
                      {({ values, setFieldValue }) => (
                        <Form className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <FormLabel htmlFor="id_number">National ID Number</FormLabel>
                              <Field
                                as={Input}
                                id="id_number"
                                name="id_number"
                                placeholder="Enter your National ID Number"
                                disabled={isLoading}
                              />
                            </div>
                            
                            <div>
                              <FormLabel htmlFor="bvn">BVN</FormLabel>
                              <Field
                                as={Input}
                                id="bvn"
                                name="bvn"
                                placeholder="Enter your 11-digit BVN"
                                disabled={isLoading}
                              />
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <div className="flex justify-between">
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={handlePrevStep}
                                disabled={isLoading}
                              >
                                Back
                              </Button>
                              <Button 
                                type="submit" 
                                className="bg-ww-purple-500 hover:bg-ww-purple-600" 
                                disabled={isLoading}
                              >
                                {isLoading ? "Submitting..." : "Submit KYC"}
                              </Button>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gray-50 p-4 rounded-lg border text-sm">
                <h3 className="font-medium mb-2">What happens next?</h3>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>We'll verify your submitted documents and information.</li>
                  <li>This process typically takes 24-48 hours to complete.</li>
                  <li>You'll receive an email notification once verification is complete.</li>
                  <li>Your account will be fully activated when verification is successful.</li>
                </ol>
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Kyc;
