
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tv, Smartphone, Wifi, Zap, Video, ArrowRight } from "lucide-react";
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
    { 
      id: "airtime", 
      name: "Airtime", 
      icon: <Smartphone className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-200 dark:border-green-800"
    },
    { 
      id: "data", 
      name: "Internet Data", 
      icon: <Wifi className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    { 
      id: "cable", 
      name: "Cable TV", 
      icon: <Tv className="h-6 w-6" />,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    { 
      id: "electricity", 
      name: "Electricity", 
      icon: <Zap className="h-6 w-6" />,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
      borderColor: "border-yellow-200 dark:border-yellow-800"
    },
    { 
      id: "netflix", 
      name: "Netflix", 
      icon: <Video className="h-6 w-6" />,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      borderColor: "border-red-200 dark:border-red-800"
    },
  ];

  return (
    <Card className={cn("w-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-xl", className)}>
      <CardHeader className="pb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
            <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Bill Payments</CardTitle>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Pay your bills quickly and securely</p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {billTypes.map(bill => (
          <Button
            key={bill.id}
            variant="outline"
            className={cn(
              "group relative overflow-hidden h-32 flex flex-col items-center justify-center text-center border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg",
              bill.bgColor,
              bill.borderColor,
              "hover:border-opacity-60 bg-white/50 dark:bg-slate-800/50"
            )}
            onClick={() => onSelectBillType(bill.id)}
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                 style={{backgroundImage: `linear-gradient(to bottom right, ${bill.color.split(' ')[1]}, ${bill.color.split(' ')[3]})`}} />
            
            <div className={cn(
              "p-3 rounded-full mb-3 transition-all duration-300 group-hover:scale-110",
              `bg-gradient-to-r ${bill.color}`,
              "text-white shadow-lg group-hover:shadow-xl"
            )}>
              {bill.icon}
            </div>
            
            <span className="font-semibold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
              {bill.name}
            </span>
            
            <ArrowRight className="h-4 w-4 mt-2 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default BillPaymentPanel;
