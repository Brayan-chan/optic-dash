import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Repair {
  id: string;
  customer: string;
  product: string;
  damageType: string;
  status: "pending" | "in-progress" | "completed";
  estimatedDelivery: string;
  saleId?: string;
  notes?: string;
}

export default function Repairs() {
  // Mock data for repairs
  const [repairs, setRepairs] = useState<Repair[]>([
    {
      id: "1",
      customer: "John Smith",
      product: "Designer Frames - Model X1",
      damageType: "Broken Frame",
      status: "pending",
      estimatedDelivery: "2023-06-20",
      saleId: "1",
    },
    {
      id: "2",
      customer: "Sarah Johnson",
      product: "Premium Sunglasses - UV Protection",
      damageType: "Scratched Lens",
      status: "in-progress",
      estimatedDelivery: "2023-06-18",
    },
    {
      id: "3",
      customer: "Michael Brown",
      product: "Transition Lenses - Grade A",
      damageType: "Loose Hinge",
      status: "completed",
      estimatedDelivery: "2023-06-15",
      saleId: "3",
    },
    {
      id: "4",
      customer: "Emily Davis",
      product: "Designer Frames - Model X2",
      damageType: "Bent Frame",
      status: "pending",
      estimatedDelivery: "2023-06-22",
    },
    {
      id: "5",
      customer: "Robert Wilson",
      product: "Reading Glasses - Standard",
      damageType: "Missing Nose Pad",
      status: "in-progress",
      estimatedDelivery: "2023-06-19",
      saleId: "5",
    },
  ]);

  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data for sales
  const sales = [
    { id: "1", reference: "SALE-001" },
    { id: "2", reference: "SALE-002" },
    { id: "3", reference: "SALE-003" },
    { id: "4", reference: "SALE-004" },
    { id: "5", reference: "SALE-005" },
  ];

  const getStatusColor = (status: Repair["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: Repair["status"]) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const handleStatusChange = (
    repairId: string,
    newStatus: Repair["status"],
  ) => {
    setRepairs(
      repairs.map((repair) =>
        repair.id === repairId ? { ...repair, status: newStatus } : repair,
      ),
    );
  };

  const handleSaleAssociation = (
    repairId: string,
    saleId: string | undefined,
  ) => {
    setRepairs(
      repairs.map((repair) =>
        repair.id === repairId ? { ...repair, saleId } : repair,
      ),
    );
    setIsDialogOpen(false);
  };

  const openEditDialog = (repair: Repair) => {
    setSelectedRepair(repair);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Repairs</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Repair
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Repair List</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search repairs..." className="pl-8" />
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
                      Product
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Damage Type
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Est. Delivery
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Sale Ref
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {repairs.map((repair) => (
                    <tr key={repair.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{repair.customer}</td>
                      <td className="py-3 px-4">{repair.product}</td>
                      <td className="py-3 px-4">{repair.damageType}</td>
                      <td className="py-3 px-4">
                        <Select
                          value={repair.status}
                          onValueChange={(value) =>
                            handleStatusChange(
                              repair.id,
                              value as Repair["status"],
                            )
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <Badge
                              variant="outline"
                              className={getStatusColor(repair.status)}
                            >
                              {getStatusLabel(repair.status)}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-3 px-4">{repair.estimatedDelivery}</td>
                      <td className="py-3 px-4">
                        {repair.saleId
                          ? sales.find((s) => s.id === repair.saleId)
                              ?.reference || "-"
                          : "-"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 mr-1"
                          onClick={() => openEditDialog(repair)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
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

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Repair</DialogTitle>
            <DialogDescription>
              Update repair details and associations.
            </DialogDescription>
          </DialogHeader>

          {selectedRepair && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Input
                    id="customer"
                    value={selectedRepair.customer}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Input id="product" value={selectedRepair.product} readOnly />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="damageType">Damage Type</Label>
                <Input
                  id="damageType"
                  value={selectedRepair.damageType}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={selectedRepair.status}
                    onValueChange={(value) =>
                      setSelectedRepair({
                        ...selectedRepair,
                        status: value as Repair["status"],
                      })
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
                  <Label htmlFor="estimatedDelivery">Est. Delivery Date</Label>
                  <Input
                    id="estimatedDelivery"
                    type="date"
                    value={selectedRepair.estimatedDelivery}
                    onChange={(e) =>
                      setSelectedRepair({
                        ...selectedRepair,
                        estimatedDelivery: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="saleId">Associated Sale</Label>
                <Select
                  value={selectedRepair.saleId || ""}
                  onValueChange={(value) =>
                    setSelectedRepair({
                      ...selectedRepair,
                      saleId: value || undefined,
                    })
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
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                selectedRepair &&
                handleStatusChange(selectedRepair.id, selectedRepair.status) &&
                handleSaleAssociation(
                  selectedRepair.id,
                  selectedRepair.saleId,
                ) &&
                setIsDialogOpen(false)
              }
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
