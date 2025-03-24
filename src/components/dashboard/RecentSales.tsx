import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Sale {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "refunded";
  items: number;
}

export default function RecentSales() {
  // Mock data - in a real app, this would come from an API
  const sales: Sale[] = [
    {
      id: "1",
      customer: "John Smith",
      date: "2023-06-15",
      amount: 349.99,
      status: "completed",
      items: 2,
    },
    {
      id: "2",
      customer: "Sarah Johnson",
      date: "2023-06-14",
      amount: 129.95,
      status: "completed",
      items: 1,
    },
    {
      id: "3",
      customer: "Robert Davis",
      date: "2023-06-14",
      amount: 499.99,
      status: "pending",
      items: 3,
    },
    {
      id: "4",
      customer: "Jennifer Lee",
      date: "2023-06-13",
      amount: 89.95,
      status: "refunded",
      items: 1,
    },
  ];

  const getStatusColor = (status: Sale["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Sales</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-medium">{sale.customer}</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-500 mr-2">
                    {sale.date}
                  </span>
                  <Badge
                    variant="outline"
                    className={getStatusColor(sale.status)}
                  >
                    {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${sale.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  {sale.items} item{sale.items !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
