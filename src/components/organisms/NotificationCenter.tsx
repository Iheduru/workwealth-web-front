
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check, Calendar, CreditCard, Coins, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "loan" | "savings" | "transaction" | "system";
  read: boolean;
  timestamp: Date;
  action?: {
    label: string;
    href: string;
  };
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}) => {
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const sortedNotifications = [...notifications].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "loan":
        return <CreditCard className="h-4 w-4" />;
      case "savings":
        return <Coins className="h-4 w-4" />;
      case "transaction":
        return <Calendar className="h-4 w-4" />;
      case "system":
      default:
        return <Settings className="h-4 w-4" />;
    }
  };
  
  const handleMarkAsRead = (id: string) => {
    onMarkAsRead(id);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-ww-purple-500 text-white text-xs flex items-center justify-center translate-x-1 -translate-y-1">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="text-xs">
              Mark all as read
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="px-2 pt-2">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="max-h-[300px] overflow-auto">
            {sortedNotifications.length > 0 ? (
              <div className="divide-y">
                {sortedNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 transition-colors hover:bg-muted/50",
                      !notification.read && "bg-ww-purple-50 dark:bg-ww-purple-900/10"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className={cn(
                          "mr-3 mt-0.5 h-8 w-8 flex items-center justify-center rounded-full",
                          notification.type === "loan" && "bg-blue-100 text-blue-600",
                          notification.type === "savings" && "bg-ww-green-100 text-ww-green-600",
                          notification.type === "transaction" && "bg-amber-100 text-amber-600",
                          notification.type === "system" && "bg-ww-purple-100 text-ww-purple-600",
                        )}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div>
                          <p className={cn(
                            "text-sm font-medium",
                            !notification.read && "font-semibold"
                          )}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          {notification.action && (
                            <a 
                              href={notification.action.href}
                              className="text-xs text-ww-purple-500 hover:underline mt-2 inline-block"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              {notification.action.label}
                            </a>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp.toLocaleDateString()} · {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 rounded-full hover:bg-muted"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm text-muted-foreground">No notifications yet</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread" className="max-h-[300px] overflow-auto">
            {sortedNotifications.filter(n => !n.read).length > 0 ? (
              <div className="divide-y">
                {sortedNotifications
                  .filter(n => !n.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 transition-colors hover:bg-muted/50 bg-ww-purple-50 dark:bg-ww-purple-900/10"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className={cn(
                            "mr-3 mt-0.5 h-8 w-8 flex items-center justify-center rounded-full",
                            notification.type === "loan" && "bg-blue-100 text-blue-600",
                            notification.type === "savings" && "bg-ww-green-100 text-ww-green-600",
                            notification.type === "transaction" && "bg-amber-100 text-amber-600",
                            notification.type === "system" && "bg-ww-purple-100 text-ww-purple-600",
                          )}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            {notification.action && (
                              <a 
                                href={notification.action.href}
                                className="text-xs text-ww-purple-500 hover:underline mt-2 inline-block"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                {notification.action.label}
                              </a>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.timestamp.toLocaleDateString()} · {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 rounded-full hover:bg-muted"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm text-muted-foreground">No unread notifications</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center border-t p-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs w-full"
            onClick={() => {
              setOpen(false);
              window.location.href = "/notifications";
            }}
          >
            View All
          </Button>
          {notifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-red-500 hover:text-red-600 hover:bg-red-100/20 w-full"
              onClick={onClearAll}
            >
              Clear All
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
