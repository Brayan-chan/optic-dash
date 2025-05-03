import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Reports() {
  // Mock data for sales chart
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  const data = [4500, 6000, 5200, 7800, 8500, 10200];
  const maxValue = Math.max(...data);

  // Mock data for summary metrics
  const metrics = [
    { label: "Ventas Totales", value: "$42,200.00" },
    { label: "Venta Promedio", value: "$125.75" },
    { label: "Productos Vendidos", value: "335" },
    { label: "Clientes Atendidos", value: "187" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reportes</h1>
          <div className="flex space-x-2">
            <Select defaultValue="6months">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Últimos 30 días</SelectItem>
                <SelectItem value="6months">Últimos 6 meses</SelectItem>
                <SelectItem value="1year">Último año</SelectItem>
              </SelectContent>
            </Select>
            <Button>Generar Reporte</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500">
                  {metric.label}
                </p>
                <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="sales">
          <TabsList>
            <TabsTrigger value="sales">Ventas</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Ventas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between">
                  {months.map((month, index) => {
                    const height = (data[index] / maxValue) * 100;
                    return (
                      <div key={month} className="flex flex-col items-center">
                        <div
                          className="w-12 bg-blue-500 rounded-t-md"
                          style={{ height: `${height * 2}px` }}
                        ></div>
                        <div className="mt-2 text-sm">{month}</div>
                        <div className="text-xs text-gray-500">
                          ${data[index]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="products" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Productos Más Vendidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Designer Frames - Model X1",
                      sales: 42,
                      revenue: "$8,399.58",
                    },
                    {
                      name: "Contact Lens Solution 500ml",
                      sales: 78,
                      revenue: "$1,949.22",
                    },
                    {
                      name: "Premium Sunglasses - UV Protection",
                      sales: 35,
                      revenue: "$3,149.65",
                    },
                    {
                      name: "Transition Lenses - Grade A",
                      sales: 29,
                      revenue: "$4,349.71",
                    },
                    {
                      name: "Cleaning Cloth Pack",
                      sales: 120,
                      revenue: "$1,558.80",
                    },
                  ].map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {product.sales} unidades vendidas
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{product.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="customers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Insights de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "New Customers",
                      value: 45,
                      change: "+12% from last month",
                    },
                    {
                      name: "Returning Customers",
                      value: 142,
                      change: "+5% from last month",
                    },
                    {
                      name: "Average Purchase Value",
                      value: "$125.75",
                      change: "+8% from last month",
                    },
                    {
                      name: "Customer Retention Rate",
                      value: "78%",
                      change: "+2% from last month",
                    },
                  ].map((insight, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{insight.name}</p>
                        <p className="text-sm text-green-500">
                          {insight.change}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{insight.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
