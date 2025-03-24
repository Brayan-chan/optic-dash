import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: number;
  status: "active" | "inactive";
}

export default function Customers() {
  // Mock data for customers
  const customers: Customer[] = [
    {
      id: "1",
      name: "John Smith",
      phone: "(555) 123-4567",
      email: "john.smith@example.com",
      balance: 249.99,
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      phone: "(555) 987-6543",
      email: "sarah.j@example.com",
      balance: 0,
      status: "active",
    },
    {
      id: "3",
      name: "Michael Brown",
      phone: "(555) 456-7890",
      email: "michael.b@example.com",
      balance: 125.5,
      status: "active",
    },
    {
      id: "4",
      name: "Emily Davis",
      phone: "(555) 789-0123",
      email: "emily.d@example.com",
      balance: 75.25,
      status: "inactive",
    },
    {
      id: "5",
      name: "Robert Wilson",
      phone: "(555) 234-5678",
      email: "robert.w@example.com",
      balance: 350.0,
      status: "active",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Customers</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Customer List</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search customers..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Balance
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
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{customer.name}</td>
                      <td className="py-3 px-4">{customer.phone}</td>
                      <td className="py-3 px-4">{customer.email}</td>
                      <td className="py-3 px-4">
                        ${customer.balance.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            customer.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {customer.status.charAt(0).toUpperCase() +
                            customer.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 mr-1"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
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
