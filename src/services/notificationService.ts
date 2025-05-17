
import { v4 as uuid } from 'uuid';

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

// Mock notification data storage
let notifications: Notification[] = [
  {
    id: uuid(),
    title: "Loan Reminder",
    message: "Your loan payment is due in 5 days",
    type: "loan",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    action: {
      label: "View Loan Details",
      href: "/loan"
    }
  },
  {
    id: uuid(),
    title: "Savings Goal Milestone",
    message: "You've reached 60% of your House Fund target!",
    type: "savings",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    action: {
      label: "View Savings",
      href: "/savings"
    }
  },
  {
    id: uuid(),
    title: "New Feature Available",
    message: "Try our new bill payment service",
    type: "system",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    action: {
      label: "Learn More",
      href: "/dashboard"
    }
  },
  {
    id: uuid(),
    title: "Transaction Successful",
    message: "Transfer of ₦25,000 to Abayomi successful",
    type: "transaction",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  }
];

// Get all notifications
export const getAllNotifications = (): Notification[] => {
  return [...notifications];
};

// Get unread notifications count
export const getUnreadCount = (): number => {
  return notifications.filter(n => !n.read).length;
};

// Mark a notification as read
export const markAsRead = (id: string): void => {
  notifications = notifications.map(n => 
    n.id === id ? { ...n, read: true } : n
  );
};

// Mark all notifications as read
export const markAllAsRead = (): void => {
  notifications = notifications.map(n => ({ ...n, read: true }));
};

// Clear all notifications
export const clearAllNotifications = (): void => {
  notifications = [];
};

// Add a new notification
export const addNotification = (
  title: string,
  message: string,
  type: "loan" | "savings" | "transaction" | "system",
  action?: { label: string; href: string }
): Notification => {
  const newNotification: Notification = {
    id: uuid(),
    title,
    message,
    type,
    read: false,
    timestamp: new Date(),
    action
  };
  
  notifications = [newNotification, ...notifications];
  return newNotification;
};

// Delete a notification
export const deleteNotification = (id: string): void => {
  notifications = notifications.filter(n => n.id !== id);
};
