import { DollarSign, Users, ShoppingBag, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SummaryWidgetProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
}

function SummaryWidget({
  title,
  value,
  change,
  icon,
  trend,
}: SummaryWidgetProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p
              className={`text-xs mt-1 flex items-center ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"}`}
            >
              {change}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SummaryWidgets() {
  // Mock data - in a real app, this would come from an API
  const summaryData = [
    {
      title: "Total Sales",
      value: "$12,426",
      change: "↑ 12% from last month",
      icon: <DollarSign className="h-6 w-6" />,
      trend: "up" as const,
    },
    {
      title: "Customers",
      value: "2,340",
      change: "↑ 5% from last month",
      icon: <Users className="h-6 w-6" />,
      trend: "up" as const,
    },
    {
      title: "Products",
      value: "540",
      change: "→ No change",
      icon: <ShoppingBag className="h-6 w-6" />,
      trend: "neutral" as const,
    },
    {
      title: "Appointments",
      value: "38",
      change: "↓ 2% from last month",
      icon: <Calendar className="h-6 w-6" />,
      trend: "down" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((widget) => (
        <SummaryWidget key={widget.title} {...widget} />
      ))}
    </div>
  );
}
