
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tv, Smartphone, Wifi, CreditCard, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface BillPaymentPanelProps {
  className?: string;
  onSelectBillType: (type: string) => void;
}

const BillPaymentPanel: React.FC<BillPaymentPanelProps> = ({
  className = "",
  onSelectBillType,
}) => {
  const billTypes = [
    { id: "airtime", name: "Airtime", icon: <Smartphone className="h-5 w-5 mb-1 text-ww-green-500" /> },
    { id: "data", name: "Internet Data", icon: <Wifi className="h-5 w-5 mb-1 text-ww-green-500" /> },
    { id: "cable", name: "Cable TV", icon: <Tv className="h-5 w-5 mb-1 text-ww-green-500" /> },
    { id: "electricity", name: "Electricity", icon: <CreditCard className="h-5 w-5 mb-1 text-ww-green-500" /> },
    { id: "netflix", name: "Netflix", icon: <Video className="h-5 w-5 mb-1 text-ww-green-500" /> },
  ];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Bill Payments</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {billTypes.map(bill => (
          <Button
            key={bill.id}
            variant="outline"
            className="flex flex-col h-24 items-center justify-center border-dashed text-left border-ww-purple-200 hover:border-ww-purple-300 hover:bg-ww-purple-50 dark:hover:bg-ww-purple-900/20"
            onClick={() => onSelectBillType(bill.id)}
          >
            {bill.icon}
            <span className="text-sm font-medium">{bill.name}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default BillPaymentPanel;
