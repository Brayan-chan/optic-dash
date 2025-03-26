import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewRepair() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    damageType: "",
    status: "pending",
    estimatedDelivery: "",
    saleId: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the repair to a database
    console.log("Repair data:", formData);
    // Navigate back to the repairs list
    navigate("/repairs");
  };

  // Mock data for customers, products, and sales
  const customers = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Sarah Johnson" },
    { id: "3", name: "Michael Brown" },
    { id: "4", name: "Emily Davis" },
    { id: "5", name: "Robert Wilson" },
  ];

  const products = [
    { id: "1", name: "Designer Frames - Model X1" },
    { id: "2", name: "Premium Sunglasses - UV Protection" },
    { id: "3", name: "Transition Lenses - Grade A" },
    { id: "4", name: "Designer Frames - Model X2" },
    { id: "5", name: "Reading Glasses - Standard" },
  ];

  const damageTypes = [
    "Broken Frame",
    "Scratched Lens",
    "Loose Hinge",
    "Bent Frame",
    "Missing Nose Pad",
    "Damaged Temple",
    "Other",
  ];

  const sales = [
    { id: "1", reference: "SALE-001" },
    { id: "2", reference: "SALE-002" },
    { id: "3", reference: "SALE-003" },
    { id: "4", reference: "SALE-004" },
    { id: "5", reference: "SALE-005" },
  ];

  // Get tomorrow's date for the min date of the estimated delivery input
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Create New Repair</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Repair Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select
                    value={formData.customer}
                    onValueChange={(value) =>
                      handleSelectChange("customer", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Select
                    value={formData.product}
                    onValueChange={(value) =>
                      handleSelectChange("product", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="damageType">Damage Type</Label>
                  <Select
                    value={formData.damageType}
                    onValueChange={(value) =>
                      handleSelectChange("damageType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select damage type" />
                    </SelectTrigger>
                    <SelectContent>
                      {damageTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedDelivery">
                    Estimated Delivery Date
                  </Label>
                  <Input
                    id="estimatedDelivery"
                    name="estimatedDelivery"
                    type="date"
                    min={tomorrowStr}
                    value={formData.estimatedDelivery}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="saleId">Associated Sale (Optional)</Label>
                  <Select
                    value={formData.saleId}
                    onValueChange={(value) =>
                      handleSelectChange("saleId", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {sales.map((sale) => (
                        <SelectItem key={sale.id} value={sale.id}>
                          {sale.reference}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter any additional details about the repair..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/repairs")}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Repair</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
