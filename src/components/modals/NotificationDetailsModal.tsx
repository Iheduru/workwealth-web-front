
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Coins, Calendar, Settings, Clock, X } from "lucide-react";
import { Notification } from "@/services/notificationService";

interface NotificationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: Notification | null;
  onMarkAsRead: (id: string) => void;
}

const NotificationDetailsModal: React.FC<NotificationDetailsModalProps> = ({
  isOpen,
  onClose,
  notification,
  onMarkAsRead,
}) => {
  if (!notification) return null;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "loan":
        return <CreditCard className="h-6 w-6" />;
      case "savings":
        return <Coins className="h-6 w-6" />;
      case "transaction":
        return <Calendar className="h-6 w-6" />;
      case "system":
      default:
        return <Settings className="h-6 w-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "loan":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300";
      case "savings":
        return "bg-ww-green-100 text-ww-green-600 dark:bg-ww-green-900/30 dark:text-ww-green-300";
      case "transaction":
        return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300";
      case "system":
      default:
        return "bg-ww-purple-100 text-ww-purple-600 dark:bg-ww-purple-900/30 dark:text-ww-purple-300";
    }
  };

  const getDetailedContent = (notification: Notification) => {
    switch (notification.type) {
      case "loan":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {notification.message}
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Next Steps:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Review your loan application status</li>
                <li>• Check required documents</li>
                <li>• Contact support if you have questions</li>
              </ul>
            </div>
          </div>
        );
      case "savings":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {notification.message}
            </p>
            <div className="bg-ww-green-50 dark:bg-ww-green-900/20 p-3 rounded-lg">
              <h4 className="font-medium text-ww-green-900 dark:text-ww-green-100 mb-2">Savings Tips:</h4>
              <ul className="text-sm text-ww-green-800 dark:text-ww-green-200 space-y-1">
                <li>• Set up automatic transfers</li>
                <li>• Track your progress regularly</li>
                <li>• Adjust goals as needed</li>
              </ul>
            </div>
          </div>
        );
      case "transaction":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {notification.message}
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Transaction Details:</h4>
              <div className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                <p>• View full transaction history</p>
                <p>• Download transaction receipts</p>
                <p>• Set up transaction alerts</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {notification.message}
            </p>
            <div className="bg-ww-purple-50 dark:bg-ww-purple-900/20 p-3 rounded-lg">
              <h4 className="font-medium text-ww-purple-900 dark:text-ww-purple-100 mb-2">System Information:</h4>
              <p className="text-sm text-ww-purple-800 dark:text-ww-purple-200">
                Check your account settings and preferences for more details.
              </p>
            </div>
          </div>
        );
    }
  };

  const handleMarkAsRead = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div>
                <DialogTitle className="text-left">{notification.title}</DialogTitle>
                <div className="flex items-center mt-1 space-x-2">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {notification.type}
                  </Badge>
                  {!notification.read && (
                    <Badge variant="secondary" className="text-xs bg-ww-purple-100 text-ww-purple-800">
                      Unread
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {getDetailedContent(notification)}
          
          <div className="flex items-center justify-between pt-3 border-t text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{notification.timestamp.toLocaleDateString()} at {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            {!notification.read && (
              <Button onClick={handleMarkAsRead} size="sm" className="flex-1">
                Mark as Read
              </Button>
            )}
            <Button variant="outline" onClick={onClose} size="sm" className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDetailsModal;
