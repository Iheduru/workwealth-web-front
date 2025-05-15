
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowDownIcon, ArrowRightIcon } from "lucide-react";

interface QuickActionsPanelProps {
  onDeposit: () => void;
  onWithdraw: () => void;
  onTransfer: () => void;
  className?: string;
}

const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  onDeposit,
  onWithdraw,
  onTransfer,
  className = "",
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button
          variant="outline"
          className="flex flex-col h-24 items-center justify-center border-dashed text-left border-ww-purple-200 hover:border-ww-purple-300 hover:bg-ww-purple-50"
          onClick={onDeposit}
        >
          <PlusIcon className="h-5 w-5 mb-1 text-ww-purple-500" />
          <span className="text-sm font-medium">Deposit</span>
          <span className="text-xs text-muted-foreground">Add funds</span>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col h-24 items-center justify-center border-dashed text-left border-ww-purple-200 hover:border-ww-purple-300 hover:bg-ww-purple-50"
          onClick={onWithdraw}
        >
          <ArrowDownIcon className="h-5 w-5 mb-1 text-ww-purple-500" />
          <span className="text-sm font-medium">Withdraw</span>
          <span className="text-xs text-muted-foreground">Get cash</span>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col h-24 items-center justify-center border-dashed text-left border-ww-purple-200 hover:border-ww-purple-300 hover:bg-ww-purple-50"
          onClick={onTransfer}
        >
          <ArrowRightIcon className="h-5 w-5 mb-1 text-ww-purple-500" />
          <span className="text-sm font-medium">Transfer</span>
          <span className="text-xs text-muted-foreground">Send money</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsPanel;
