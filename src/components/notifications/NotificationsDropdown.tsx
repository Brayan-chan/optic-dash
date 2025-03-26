import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationItem, { NotificationItemProps } from "./NotificationItem";

interface Notification
  extends Omit<NotificationItemProps, "onMarkAsRead" | "onArchive"> {}

// Mock data for notifications
const generateMockNotifications = (): Notification[] => [
  {
    id: "1",
    title: "Low Stock Alert",
    message: "Frames XYZ-123 are running low (2 remaining)",
    time: "10 min ago",
    type: "inventory",
    read: false,
  },
  {
    id: "2",
    title: "Repair Ready",
    message: "Repair #R-2023-45 for John Smith is ready for pickup",
    time: "1 hour ago",
    type: "repair",
    read: false,
  },
  {
    id: "3",
    title: "Upcoming Appointment",
    message: "Sarah Johnson has an eye exam tomorrow at 2:30 PM",
    time: "2 hours ago",
    type: "appointment",
    read: false,
  },
  {
    id: "4",
    title: "Low Stock Alert",
    message: "Contact lenses ABC-456 are running low (5 boxes remaining)",
    time: "3 hours ago",
    type: "inventory",
    read: true,
  },
  {
    id: "5",
    title: "Upcoming Appointment",
    message: "Michael Brown has a fitting today at 4:00 PM",
    time: "Yesterday",
    type: "appointment",
    read: true,
  },
];

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load notifications on component mount
  useEffect(() => {
    // In a real app, you would fetch this from an API
    // For now, we'll use mock data
    setNotifications(generateMockNotifications());
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const handleArchive = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex gap-2">
            {notifications.some((n) => !n.read) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={handleClearAll}
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                {...notification}
                onMarkAsRead={handleMarkAsRead}
                onArchive={handleArchive}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
