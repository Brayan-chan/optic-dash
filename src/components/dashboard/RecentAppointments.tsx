import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  customer: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
}

export default function RecentAppointments() {
  // Mock data - in a real app, this would come from an API
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
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Appointments</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
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
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50">
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
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
