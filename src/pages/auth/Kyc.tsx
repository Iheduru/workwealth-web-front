
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { AlertTriangle, Upload, Check } from "lucide-react";
import AlertBanner from "@/components/molecules/AlertBanner";
import InputWithIcon from "@/components/molecules/InputWithIcon";
import FormLabel from "@/components/atoms/FormLabel";

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

  const handleKycSubmit = async (values: { id_number: string; bvn: string }) => {
    if (!idCardUploaded) {
      setIdCardError("Please upload your ID card");
      return;
    }
    
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      toast({
        title: "KYC verification submitted",
        description: "We'll review your information and get back to you soon."
      });
      
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Complete Your KYC</h1>
        <p className="text-muted-foreground mt-1">
          We need a few more details to verify your identity
        </p>
      </div>

      <AlertBanner
        type="info"
        message="Your identity verification helps us comply with regulations and protect your account."
        className="mb-6"
      />

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
        </CardContent>
      </Card>

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
            
            <Button type="submit" className="w-full bg-ww-purple-500 hover:bg-ww-purple-600" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit KYC"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Kyc;
