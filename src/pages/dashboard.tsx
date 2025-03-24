import DashboardLayout from "@/components/layout/DashboardLayout";
import SummaryWidgets from "@/components/dashboard/SummaryWidgets";
import RecentAppointments from "@/components/dashboard/RecentAppointments";
import SalesChart from "@/components/dashboard/SalesChart";
import LowStockAlert from "@/components/dashboard/LowStockAlert";
import RecentSales from "@/components/dashboard/RecentSales";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <SummaryWidgets />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <SalesChart />
          <RecentAppointments />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <LowStockAlert />
          <RecentSales />
        </div>
      </div>
    </DashboardLayout>
  );
}
