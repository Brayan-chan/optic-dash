import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
}

export default function LowStockAlert() {
  // Mock data - in a real app, this would come from an API
  const products: Product[] = [
    {
      id: "1",
      name: "Designer Frames - Model X1",
      category: "Frames",
      currentStock: 3,
      minStock: 5,
    },
    {
      id: "2",
      name: "Contact Lens Solution 500ml",
      category: "Solutions",
      currentStock: 2,
      minStock: 10,
    },
    {
      id: "3",
      name: "Cleaning Cloth Pack",
      category: "Accessories",
      currentStock: 4,
      minStock: 15,
    },
    {
      id: "4",
      name: "Transition Lenses - Grade A",
      category: "Lenses",
      currentStock: 5,
      minStock: 8,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Low Stock Alert</CardTitle>
        <Button variant="outline" size="sm">
          Order Inventory
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => {
            const stockPercentage =
              (product.currentStock / product.minStock) * 100;
            return (
              <div
                key={product.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="mr-2">
                      {product.category}
                    </Badge>
                    <span className="text-sm text-red-500">
                      {product.currentStock} / {product.minStock} units
                    </span>
                  </div>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stockPercentage < 30 ? "bg-red-500" : "bg-yellow-500"}`}
                    style={{ width: `${stockPercentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
