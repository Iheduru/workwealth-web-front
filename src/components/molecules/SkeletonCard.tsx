
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  header?: boolean;
  footerLines?: number;
  lines?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = "",
  header = true,
  lines = 4,
  footerLines = 0
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      {header && (
        <CardHeader className="pb-2">
          <Skeleton className="h-7 w-[180px] mb-2" />
          <Skeleton className="h-4 w-[120px]" />
        </CardHeader>
      )}
      <CardContent>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={`line-${i}`}
            className={cn("h-4", i === lines - 1 ? "w-[60%]" : "w-full", "my-2")}
          />
        ))}
        
        {footerLines > 0 && (
          <div className="mt-6 pt-4 border-t">
            {Array.from({ length: footerLines }).map((_, i) => (
              <Skeleton
                key={`footer-${i}`}
                className={cn("h-4", i === footerLines - 1 ? "w-[40%]" : "w-[80%]", "my-2")}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const SkeletonWalletCard: React.FC<{ className?: string }> = ({ 
  className = "" 
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="bg-gradient-to-r from-ww-purple-600/40 to-ww-purple-800/40 p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24 bg-white/30" />
            <div className="flex items-baseline">
              <Skeleton className="h-8 w-36 bg-white/30" />
            </div>
            <div className="pt-4 mt-2 border-t border-white/20">
              <Skeleton className="h-4 w-24 bg-white/30 mb-2" />
              <Skeleton className="h-5 w-32 bg-white/30" />
            </div>
          </div>
          <Skeleton className="h-10 w-10 rounded-full bg-white/30" />
        </div>
      </div>
      <div className="p-4">
        <Skeleton className="h-4 w-24 bg-muted mb-2" />
        <div className="flex justify-between">
          <Skeleton className="h-5 w-28 bg-muted" />
          <Skeleton className="h-5 w-20 bg-muted" />
        </div>
      </div>
    </Card>
  );
};

export const SkeletonTransactionItem: React.FC = () => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center">
      <Skeleton className="w-10 h-10 rounded-full mr-3" />
      <div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
    <Skeleton className="h-4 w-20" />
  </div>
);

export const SkeletonFormField: React.FC = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-10 w-full" />
  </div>
);

export const SkeletonButtonGroup: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} className="h-24 w-full" />
    ))}
  </div>
);
