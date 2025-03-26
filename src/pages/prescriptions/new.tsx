import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewPrescription() {
  const [searchParams] = useSearchParams();
  const patientFromUrl = searchParams.get("patient");

  const [formData, setFormData] = useState({
    patient: patientFromUrl || "",
    doctor: "",
    date: new Date().toISOString().split("T")[0],
    rightSphere: "",
    rightCylinder: "",
    rightAxis: "",
    rightAdd: "",
    leftSphere: "",
    leftCylinder: "",
    leftAxis: "",
    leftAdd: "",
    pdDistance: "",
    pdNear: "",
    prescriptionType: "glasses",
    notes: "",
  });

  // Mock data for doctors
  const doctors = [
    { id: "1", name: "Dr. Emily Chen" },
    { id: "2", name: "Dr. Michael Wong" },
    { id: "3", name: "Dr. Sarah Johnson" },
  ];

  // Update form when patient is passed via URL
  useEffect(() => {
    if (patientFromUrl) {
      setFormData((prev) => ({ ...prev, patient: patientFromUrl }));
    }
  }, [patientFromUrl]);

  const handleInputChange = (
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
    // In a real app, this would save the prescription to a database
    console.log("Prescription data:", formData);
    alert("Prescription saved successfully!");
    // Reset form or redirect
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">New Prescription</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient Name</Label>
                    <Input
                      id="patient"
                      name="patient"
                      value={formData.patient}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select
                      value={formData.doctor}
                      onValueChange={(value) =>
                        handleSelectChange("doctor", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.name}>
                            {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Prescription Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prescription Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Prescription Type</Label>
                    <Select
                      value={formData.prescriptionType}
                      onValueChange={(value) =>
                        handleSelectChange("prescriptionType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="glasses">Glasses</SelectItem>
                        <SelectItem value="contacts">Contact Lenses</SelectItem>
                        <SelectItem value="bifocal">Bifocal</SelectItem>
                        <SelectItem value="progressive">Progressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Right Eye (OD)</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rightSphere">Sphere</Label>
                          <Input
                            id="rightSphere"
                            name="rightSphere"
                            value={formData.rightSphere}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rightCylinder">Cylinder</Label>
                          <Input
                            id="rightCylinder"
                            name="rightCylinder"
                            value={formData.rightCylinder}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rightAxis">Axis</Label>
                          <Input
                            id="rightAxis"
                            name="rightAxis"
                            value={formData.rightAxis}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rightAdd">Add</Label>
                          <Input
                            id="rightAdd"
                            name="rightAdd"
                            value={formData.rightAdd}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Left Eye (OS)</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="leftSphere">Sphere</Label>
                          <Input
                            id="leftSphere"
                            name="leftSphere"
                            value={formData.leftSphere}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leftCylinder">Cylinder</Label>
                          <Input
                            id="leftCylinder"
                            name="leftCylinder"
                            value={formData.leftCylinder}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leftAxis">Axis</Label>
                          <Input
                            id="leftAxis"
                            name="leftAxis"
                            value={formData.leftAxis}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leftAdd">Add</Label>
                          <Input
                            id="leftAdd"
                            name="leftAdd"
                            value={formData.leftAdd}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pdDistance">PD Distance</Label>
                      <Input
                        id="pdDistance"
                        name="pdDistance"
                        value={formData.pdDistance}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pdNear">PD Near</Label>
                      <Input
                        id="pdNear"
                        name="pdNear"
                        value={formData.pdNear}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Enter any additional instructions or notes..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save Prescription</Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
