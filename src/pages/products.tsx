import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

export default function Products() {
  // Mock data for products
  const products: Product[] = [
    {
      id: "1",
      name: "Designer Frames - Model X1",
      category: "Frames",
      stock: 15,
      price: 199.99,
      status: "in-stock",
    },
    {
      id: "2",
      name: "Contact Lens Solution 500ml",
      category: "Solutions",
      stock: 8,
      price: 24.99,
      status: "in-stock",
    },
    {
      id: "3",
      name: "Cleaning Cloth Pack",
      category: "Accessories",
      stock: 4,
      price: 12.99,
      status: "low-stock",
    },
    {
      id: "4",
      name: "Transition Lenses - Grade A",
      category: "Lenses",
      stock: 0,
      price: 149.99,
      status: "out-of-stock",
    },
    {
      id: "5",
      name: "Premium Sunglasses - UV Protection",
      category: "Sunglasses",
      stock: 22,
      price: 89.99,
      status: "in-stock",
    },
  ];

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Product List</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-8" />
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
                      Category
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Stock
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Price
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
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="py-3 px-4">{product.stock} units</td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={getStatusColor(product.status)}
                        >
                          {product.status
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
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
