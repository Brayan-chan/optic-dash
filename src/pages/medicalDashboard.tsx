import DashboardLayout from "@/components/layout/DashboardLayout";
import TodaysAppointments from "@/components/medicalDashboard/TodaysAppointments";
import PatientMedicalHistory from "@/components/medicalDashboard/PatientMedicalHistory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function MedicalDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Medical Dashboard</h1>
          <Link to="/prescriptions/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Prescription
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TodaysAppointments />
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/prescriptions/new" className="block w-full">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Register New Prescription
                </Button>
              </Link>
              <Link to="/appointments/new" className="block w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule New Appointment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <PatientMedicalHistory />
      </div>
    </DashboardLayout>
  );
}
