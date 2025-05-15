
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import DepositModal from "@/components/modals/DepositModal";
import WithdrawModal from "@/components/modals/WithdrawModal";
import TransferModal from "@/components/modals/TransferModal";

interface QuickActionsPanelProps {
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
  onTransfer: (amount: number, recipient: string) => void;
  balance: number;
  className?: string;
}

const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  onDeposit,
  onWithdraw,
  onTransfer,
  balance,
  className = "",
}) => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="flex flex-col h-24 items-center justify-center border-dashed text-left border-ww-purple-200 hover:border-ww-purple-300 hover:bg-ww-purple-50 dark:hover:bg-ww-purple-900/20"
            onClick={() => setIsDepositOpen(true)}
          >
            <PlusIcon className="h-5 w-5 mb-1 text-ww-purple-500" />
            <span className="text-sm font-medium">Deposit</span>
            <span className="text-xs text-muted-foreground">Add funds</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col h-24 items-center justify-center border-dashed text-left border-ww-purple-200 hover:border-ww-purple-300 hover:bg-ww-purple-50 dark:hover:bg-ww-purple-900/20"
            onClick={() => setIsWithdrawOpen(true)}
          >
            <ArrowDownIcon className="h-5 w-5 mb-1 text-ww-purple-500" />
            <span className="text-sm font-medium">Withdraw</span>
            <span className="text-xs text-muted-foreground">Get cash</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col h-24 items-center justify-center border-dashed text-left border-ww-purple-200 hover:border-ww-purple-300 hover:bg-ww-purple-50 dark:hover:bg-ww-purple-900/20"
            onClick={() => setIsTransferOpen(true)}
          >
            <ArrowRightIcon className="h-5 w-5 mb-1 text-ww-purple-500" />
            <span className="text-sm font-medium">Transfer</span>
            <span className="text-xs text-muted-foreground">Send money</span>
          </Button>
        </CardContent>
      </Card>

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onSuccess={onDeposit}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        maxAmount={balance}
        onSuccess={onWithdraw}
      />

      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        maxAmount={balance}
        onSuccess={onTransfer}
      />
    </>
  );
};

export default QuickActionsPanel;
