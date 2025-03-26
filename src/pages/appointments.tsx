import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash, Calendar, Check, X } from "lucide-react";

interface Appointment {
  id: string;
  customer: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
}

export default function Appointments() {
  // Mock data for appointments
  const appointments: Appointment[] = [
    {
      id: "1",
      customer: "John Smith",
      doctor: "Dr. Emily Chen",
      date: "2023-06-15",
      time: "10:00 AM",
      reason: "Eye Examination",
      status: "scheduled",
    },
    {
      id: "2",
      customer: "Sarah Johnson",
      doctor: "Dr. Michael Wong",
      date: "2023-06-15",
      time: "11:30 AM",
      reason: "Contact Lens Fitting",
      status: "scheduled",
    },
    {
      id: "3",
      customer: "Robert Davis",
      doctor: "Dr. Emily Chen",
      date: "2023-06-14",
      time: "2:00 PM",
      reason: "Glasses Adjustment",
      status: "completed",
    },
    {
      id: "4",
      customer: "Jennifer Lee",
      doctor: "Dr. Michael Wong",
      date: "2023-06-14",
      time: "3:30 PM",
      reason: "Eye Examination",
      status: "cancelled",
    },
    {
      id: "5",
      customer: "David Wilson",
      doctor: "Dr. Emily Chen",
      date: "2023-06-16",
      time: "9:15 AM",
      reason: "Vision Test",
      status: "scheduled",
    },
  ];

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Appointment List</CardTitle>
              <div className="flex space-x-2">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
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
                      Doctor
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Date & Time
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Reason
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
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{appointment.customer}</td>
                      <td className="py-3 px-4">{appointment.doctor}</td>
                      <td className="py-3 px-4">
                        {appointment.date} at {appointment.time}
                      </td>
                      <td className="py-3 px-4">{appointment.reason}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={getStatusColor(appointment.status)}
                        >
                          {appointment.status === "scheduled" && (
                            <Calendar className="h-3 w-3 mr-1 inline" />
                          )}
                          {appointment.status === "completed" && (
                            <Check className="h-3 w-3 mr-1 inline" />
                          )}
                          {appointment.status === "cancelled" && (
                            <X className="h-3 w-3 mr-1 inline" />
                          )}
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
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
