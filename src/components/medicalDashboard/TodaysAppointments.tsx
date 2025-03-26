import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface Appointment {
  id: string;
  customer: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
}

export default function TodaysAppointments() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Mock data - in a real app, this would come from an API
  const allAppointments: Appointment[] = [
    {
      id: "1",
      customer: "John Smith",
      doctor: "Dr. Emily Chen",
      date: today,
      time: "10:00 AM",
      reason: "Eye Examination",
      status: "scheduled",
    },
    {
      id: "2",
      customer: "Sarah Johnson",
      doctor: "Dr. Michael Wong",
      date: today,
      time: "11:30 AM",
      reason: "Contact Lens Fitting",
      status: "scheduled",
    },
    {
      id: "3",
      customer: "Robert Davis",
      doctor: "Dr. Emily Chen",
      date: today,
      time: "2:00 PM",
      reason: "Glasses Adjustment",
      status: "scheduled",
    },
    {
      id: "4",
      customer: "Jennifer Lee",
      doctor: "Dr. Michael Wong",
      date: today,
      time: "3:30 PM",
      reason: "Eye Examination",
      status: "scheduled",
    },
  ];

  // Filter appointments for today
  const todaysAppointments = allAppointments.filter(
    (appointment) => appointment.date === today,
  );

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Today's Appointments</CardTitle>
        <Link to="/appointments">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {todaysAppointments.length === 0 ? (
            <p className="text-center py-4 text-gray-500">
              No appointments scheduled for today
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    Patient
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    Time
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    Reason
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-sm">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {todaysAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{appointment.customer}</td>
                    <td className="py-3 px-4">{appointment.time}</td>
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
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/prescriptions/new?patient=${encodeURIComponent(appointment.customer)}`}
                      >
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4 mr-1" />
                          Prescription
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
