import { ReactNode } from "react";
import { Check, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "inventory" | "repair" | "appointment";
  read: boolean;
  onMarkAsRead: (id: string) => void;
  onArchive: (id: string) => void;
}

const getIconForType = (type: string): ReactNode => {
  switch (type) {
    case "inventory":
      return (
        <div className="bg-amber-100 p-2 rounded-full">
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
        </div>
      );
    case "repair":
      return (
        <div className="bg-green-100 p-2 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      );
    case "appointment":
      return (
        <div className="bg-blue-100 p-2 rounded-full">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      );
    default:
      return (
        <div className="bg-gray-100 p-2 rounded-full">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        </div>
      );
  }
};

export default function NotificationItem({
  id,
  title,
  message,
  time,
  type,
  read,
  onMarkAsRead,
  onArchive,
}: NotificationItemProps) {
  return (
    <div className={`p-3 border-b ${read ? "bg-gray-50" : "bg-white"}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">{getIconForType(type)}</div>
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start">
            <h4
              className={`text-sm font-medium ${read ? "text-gray-600" : "text-gray-900"}`}
            >
              {title}
            </h4>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
              {time}
            </span>
          </div>
          <p
            className={`text-xs mt-1 ${read ? "text-gray-500" : "text-gray-700"}`}
          >
            {message}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-2 gap-2">
        {!read && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onMarkAsRead(id)}
          >
            <Check className="h-3 w-3 mr-1" />
            Mark as read
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => onArchive(id)}
        >
          <Archive className="h-3 w-3 mr-1" />
          Archive
        </Button>
      </div>
    </div>
  );
}
