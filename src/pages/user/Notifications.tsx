import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  getAllNotifications, 
  markAsRead, 
  markAllAsRead, 
  clearAllNotifications,
  Notification 
} from "@/services/notificationService";
import { Bell, CheckCheck, Trash2, CreditCard, Coins, Calendar, Settings } from "lucide-react";
import { formatDate } from "@/lib/utils";
import NotificationDetailsModal from "@/components/modals/NotificationDetailsModal";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Load notifications on component mount
  useEffect(() => {
    setNotifications(getAllNotifications());
  }, []);

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    setNotifications(getAllNotifications());
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setNotifications(getAllNotifications());
  };

  const handleClearAll = () => {
    clearAllNotifications();
    setNotifications([]);
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDetailsModalOpen(true);
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "read") return notification.read;
    if (filter === "unread") return !notification.read;
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "loan":
        return <CreditCard className="h-5 w-5" />;
      case "savings":
        return <Coins className="h-5 w-5" />;
      case "transaction":
        return <Calendar className="h-5 w-5" />;
      case "system":
      default:
        return <Settings className="h-5 w-5" />;
    }
  };

  const getNotificationDate = (timestamp: Date) => {
    const date = timestamp;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return formatDate(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Stay informed about important updates and activities
          </p>
        </div>
        
        <div className="flex mt-4 sm:mt-0 space-x-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
          >
            Unread
          </Button>
          <Button
            variant={filter === "read" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("read")}
          >
            Read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Your Notifications
            </CardTitle>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                <CheckCheck className="mr-1 h-4 w-4" />
                Mark All Read
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                <Trash2 className="mr-1 h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex p-4 cursor-pointer hover:bg-muted/30 transition-colors ${!notification.read ? "bg-muted/50" : ""}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    notification.type === "loan" 
                      ? "bg-blue-100 text-blue-600" 
                      : notification.type === "savings"
                        ? "bg-ww-green-100 text-ww-green-600"
                        : notification.type === "transaction"
                          ? "bg-amber-100 text-amber-600" 
                          : "bg-ww-purple-100 text-ww-purple-600"
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground">
                          {getNotificationDate(notification.timestamp)}
                        </span>
                        
                        {!notification.read && (
                          <div className="w-2 h-2 bg-ww-purple-500 rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-4 text-lg font-medium">No notifications</p>
              <p className="text-muted-foreground">
                {filter !== "all" 
                  ? `You don't have any ${filter} notifications`
                  : "You're all caught up!"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <NotificationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        notification={selectedNotification}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default NotificationsPage;
