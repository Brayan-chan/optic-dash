import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SalesChart() {
  // Mock data - in a real app, this would come from an API and use a charting library
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = [4500, 6000, 5200, 7800, 8500, 10200];
  const maxValue = Math.max(...data);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sales Overview</CardTitle>
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
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
                <div className="text-xs text-gray-500">${data[index]}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
