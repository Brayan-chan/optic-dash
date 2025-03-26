import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Eye,
  Check,
  Clock,
  RefreshCcw,
  MoreVertical,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Sale {
  id: string;
  customer: string;
  date: string;
  total: number;
  items: number;
  status: "completed" | "pending" | "refunded";
}

export default function Sales() {
  // Mock data for sales
  const sales: Sale[] = [
    {
      id: "1",
      customer: "John Smith",
      date: "2023-06-15",
      total: 349.99,
      items: 2,
      status: "completed",
    },
    {
      id: "2",
      customer: "Sarah Johnson",
      date: "2023-06-14",
      total: 129.95,
      items: 1,
      status: "completed",
    },
    {
      id: "3",
      customer: "Robert Davis",
      date: "2023-06-14",
      total: 499.99,
      items: 3,
      status: "pending",
    },
    {
      id: "4",
      customer: "Jennifer Lee",
      date: "2023-06-13",
      total: 89.95,
      items: 1,
      status: "refunded",
    },
    {
      id: "5",
      customer: "Michael Brown",
      date: "2023-06-12",
      total: 275.5,
      items: 2,
      status: "completed",
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
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sales</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Sale
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Sales History</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search sales..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Items
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Total
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{sale.customer}</td>
                      <td className="py-3 px-4">{sale.date}</td>
                      <td className="py-3 px-4">
                        {sale.items} item{sale.items !== 1 ? "s" : ""}
                      </td>
                      <td className="py-3 px-4">${sale.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={getStatusColor(sale.status)}
                        >
                          {sale.status === "completed" && (
                            <Check className="h-3 w-3 mr-1 inline" />
                          )}
                          {sale.status === "pending" && (
                            <Clock className="h-3 w-3 mr-1 inline" />
                          )}
                          {sale.status === "refunded" && (
                            <RefreshCcw className="h-3 w-3 mr-1 inline" />
                          )}
                          {sale.status.charAt(0).toUpperCase() +
                            sale.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 mr-1"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Generate receipt
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
