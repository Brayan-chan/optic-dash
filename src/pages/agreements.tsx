import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Download, Ban, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Agreement {
  id: string;
  companyName: string;
  assignedWorkers: number;
  availableCredit: number;
  usedCredit: number;
  isBlocked: boolean;
  overdueBalance: number;
}

export default function Agreements() {
  // Mock data for agreements
  const [agreements, setAgreements] = useState<Agreement[]>([
    {
      id: "1",
      companyName: "Vision Corp",
      assignedWorkers: 12,
      availableCredit: 5000,
      usedCredit: 2500,
      isBlocked: false,
      overdueBalance: 0,
    },
    {
      id: "2",
      companyName: "Optical Solutions Inc.",
      assignedWorkers: 8,
      availableCredit: 3000,
      usedCredit: 2800,
      isBlocked: false,
      overdueBalance: 0,
    },
    {
      id: "3",
      companyName: "Clear View Enterprises",
      assignedWorkers: 15,
      availableCredit: 7500,
      usedCredit: 3200,
      isBlocked: false,
      overdueBalance: 0,
    },
    {
      id: "4",
      companyName: "EyeCare Partners",
      assignedWorkers: 5,
      availableCredit: 2000,
      usedCredit: 1950,
      isBlocked: true,
      overdueBalance: 450,
    },
    {
      id: "5",
      companyName: "Lens Crafters Co.",
      assignedWorkers: 20,
      availableCredit: 10000,
      usedCredit: 4500,
      isBlocked: false,
      overdueBalance: 200,
    },
  ]);

  const [selectedAgreement, setSelectedAgreement] = useState<Agreement | null>(
    null,
  );
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);

  const handleDownloadReport = (agreementId: string) => {
    // In a real app, this would generate and download a report
    console.log(`Downloading report for agreement ${agreementId}`);
    alert(`Report for agreement ${agreementId} downloaded successfully!`);
  };

  const openBlockDialog = (agreement: Agreement) => {
    setSelectedAgreement(agreement);
    setIsBlockDialogOpen(true);
  };

  const handleBlockStatusChange = (agreementId: string, isBlocked: boolean) => {
    setAgreements(
      agreements.map((agreement) =>
        agreement.id === agreementId ? { ...agreement, isBlocked } : agreement,
      ),
    );
    setIsBlockDialogOpen(false);
  };

  const getCreditUtilizationColor = (available: number, used: number) => {
    const utilization = (used / available) * 100;
    if (utilization > 90) return "text-red-600";
    if (utilization > 75) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de Acuerdos</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Acuerdo
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Acuerdos de Empresas</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar empresas..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Nombre de Empresa
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Trabajadores Asignados
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Crédito Disponible
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Crédito Utilizado
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Estado
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-sm">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agreements.map((agreement) => (
                    <tr
                      key={agreement.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{agreement.companyName}</td>
                      <td className="py-3 px-4">{agreement.assignedWorkers}</td>
                      <td className="py-3 px-4">
                        ${agreement.availableCredit.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={getCreditUtilizationColor(
                            agreement.availableCredit,
                            agreement.usedCredit,
                          )}
                        >
                          ${agreement.usedCredit.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          (
                          {Math.round(
                            (agreement.usedCredit / agreement.availableCredit) *
                              100,
                          )}
                          %)
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            agreement.isBlocked
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {agreement.isBlocked ? "Bloqueado" : "Activo"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 mr-1"
                          onClick={() => handleDownloadReport(agreement.id)}
                          title="Descargar Reporte"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 mr-1 ${agreement.isBlocked ? "text-red-500" : ""}`}
                          onClick={() => openBlockDialog(agreement)}
                          title={
                            agreement.isBlocked
                              ? "Desbloquear Acuerdo"
                              : "Bloquear Acuerdo"
                          }
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Ver Detalles"
                        >
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

      {/* Block/Unblock Dialog */}
      <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedAgreement?.isBlocked
                ? "Desbloquear Acuerdo"
                : "Bloquear Acuerdo"}
            </DialogTitle>
            <DialogDescription>
              {selectedAgreement?.isBlocked
                ? "¿Está seguro de que desea desbloquear este acuerdo? Esto permitirá que la empresa utilice su crédito nuevamente."
                : "¿Está seguro de que desea bloquear este acuerdo? Esto impedirá que la empresa utilice su crédito."}
            </DialogDescription>
          </DialogHeader>

          {selectedAgreement && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Empresa</Label>
                <div className="font-medium">
                  {selectedAgreement.companyName}
                </div>
              </div>

              {selectedAgreement.overdueBalance > 0 &&
                !selectedAgreement.isBlocked && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-yellow-800">
                    <p className="font-medium">Warning: Overdue Balance</p>
                    <p className="text-sm mt-1">
                      This company has an overdue balance of $
                      {selectedAgreement.overdueBalance}.
                    </p>
                  </div>
                )}

              <div className="flex items-center justify-between">
                <Label htmlFor="blocked-status">
                  {selectedAgreement.isBlocked
                    ? "Unblock this agreement"
                    : "Block this agreement"}
                </Label>
                <Switch
                  id="blocked-status"
                  checked={!selectedAgreement.isBlocked}
                  onCheckedChange={(checked) =>
                    setSelectedAgreement({
                      ...selectedAgreement,
                      isBlocked: !checked,
                    })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBlockDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                selectedAgreement &&
                handleBlockStatusChange(
                  selectedAgreement.id,
                  selectedAgreement.isBlocked ? false : true,
                )
              }
              variant={selectedAgreement?.isBlocked ? "default" : "destructive"}
            >
              {selectedAgreement?.isBlocked ? "Unblock" : "Block"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
