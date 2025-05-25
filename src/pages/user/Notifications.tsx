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
        return <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "savings":
        return <Coins className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "transaction":
        return <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "system":
      default:
        return <Settings className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  const getNotificationDate = (timestamp: Date) => {
    const date = timestamp;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return formatDate(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-amber-900 to-slate-900 dark:from-white dark:via-amber-100 dark:to-white bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Stay informed about important updates
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-0 sm:space-x-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={`text-xs sm:text-sm ${filter === "all" ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white" : ""}`}
            >
              All
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
              className={`text-xs sm:text-sm ${filter === "unread" ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white" : ""}`}
            >
              Unread
            </Button>
            <Button
              variant={filter === "read" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("read")}
              className={`text-xs sm:text-sm ${filter === "read" ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white" : ""}`}
            >
              Read
            </Button>
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-sm sm:shadow-xl">
          <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50 p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <CardTitle className="flex items-center text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                <div className="p-1 sm:p-2 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg mr-2 sm:mr-3">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400" />
                </div>
                Your Notifications
              </CardTitle>
              
              <div className="flex space-x-2 self-end sm:self-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleMarkAllAsRead}
                  className="hover:bg-green-50 dark:hover:bg-green-900/20 text-xs sm:text-sm"
                >
                  <CheckCheck className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Mark All Read</span>
                  <span className="sm:hidden">Read All</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleClearAll}
                  className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 border-red-200 dark:border-red-800 text-xs sm:text-sm"
                >
                  <Trash2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Clear All</span>
                  <span className="sm:hidden">Clear</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`group flex p-3 sm:p-4 md:p-6 cursor-pointer hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-transparent dark:hover:from-slate-700/30 dark:hover:to-transparent transition-all duration-200 ${
                      !notification.read ? "bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:from-amber-900/20 dark:to-orange-900/20" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 md:mr-4 ${
                          notification.type === "loan" 
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                            : notification.type === "savings"
                              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : notification.type === "transaction"
                                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                      }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm sm:text-base md:text-lg truncate ${
                            !notification.read ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                          }`}>
                            {notification.title}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-base line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                        
                        <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end gap-1 sm:gap-0">
                          <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            {getNotificationDate(notification.timestamp)}
                          </span>
                          
                          {!notification.read && (
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 sm:py-16 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Bell className="h-5 w-5 sm:h-8 sm:w-8 text-slate-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
                  No notifications
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  {filter !== "all" 
                    ? `No ${filter} notifications`
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
    </div>
  );
};

export default NotificationsPage;