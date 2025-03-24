import { useState, ReactNode, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Always ensure a user exists for testing purposes
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email: "test@example.com", role: "admin" }),
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      <div
        className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "md:ml-64" : "md:ml-16"}`}
      >
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
