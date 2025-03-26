import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  type: "examination" | "prescription" | "procedure";
  description: string;
  doctor: string;
}

export default function PatientMedicalHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  // Mock data - in a real app, this would come from an API
  const patients = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Sarah Johnson" },
    { id: "3", name: "Robert Davis" },
    { id: "4", name: "Jennifer Lee" },
    { id: "5", name: "Michael Brown" },
  ];

  const medicalRecords: MedicalRecord[] = [
    {
      id: "1",
      patientId: "1",
      patientName: "John Smith",
      date: "2023-06-10",
      type: "examination",
      description: "Routine eye examination",
      doctor: "Dr. Emily Chen",
    },
    {
      id: "2",
      patientId: "1",
      patientName: "John Smith",
      date: "2023-06-10",
      type: "prescription",
      description: "Prescription for reading glasses",
      doctor: "Dr. Emily Chen",
    },
    {
      id: "3",
      patientId: "2",
      patientName: "Sarah Johnson",
      date: "2023-06-08",
      type: "examination",
      description: "Contact lens fitting",
      doctor: "Dr. Michael Wong",
    },
    {
      id: "4",
      patientId: "2",
      patientName: "Sarah Johnson",
      date: "2023-06-08",
      type: "prescription",
      description: "Prescription for contact lenses",
      doctor: "Dr. Michael Wong",
    },
    {
      id: "5",
      patientId: "3",
      patientName: "Robert Davis",
      date: "2023-06-05",
      type: "procedure",
      description: "Glasses adjustment",
      doctor: "Dr. Emily Chen",
    },
  ];

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredRecords = selectedPatient
    ? medicalRecords.filter((record) => record.patientId === selectedPatient)
    : [];

  const getTypeColor = (type: MedicalRecord["type"]) => {
    switch (type) {
      case "examination":
        return "bg-blue-100 text-blue-800";
      case "prescription":
        return "bg-purple-100 text-purple-800";
      case "procedure":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Medical History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 border-r pr-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-3 rounded-md cursor-pointer ${selectedPatient === patient.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  <div className="font-medium">{patient.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">
                    {patients.find((p) => p.id === selectedPatient)?.name}'s
                    Records
                  </h3>
                  <Link
                    to={`/prescriptions/new?patient=${encodeURIComponent(
                      patients.find((p) => p.id === selectedPatient)?.name ||
                        "",
                    )}`}
                  >
                    <Button size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      New Prescription
                    </Button>
                  </Link>
                </div>
                {filteredRecords.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    No medical records found
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {filteredRecords.map((record) => (
                      <div
                        key={record.id}
                        className="p-3 border rounded-md hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={getTypeColor(record.type)}
                              >
                                {record.type.charAt(0).toUpperCase() +
                                  record.type.slice(1)}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {record.date}
                              </span>
                            </div>
                            <p className="mt-1">{record.description}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {record.doctor}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-gray-500">
                Select a patient to view their medical history
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
