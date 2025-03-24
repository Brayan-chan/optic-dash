import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  ShoppingBag,
  Calendar,
  CreditCard,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: { title: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: <Users className="h-5 w-5" />,
    submenu: [
      { title: "All Customers", href: "/customers" },
      { title: "Add Customer", href: "/customers/new" },
    ],
  },
  {
    title: "Products",
    href: "/products",
    icon: <ShoppingBag className="h-5 w-5" />,
    submenu: [
      { title: "All Products", href: "/products" },
      { title: "Add Product", href: "/products/new" },
    ],
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: <Calendar className="h-5 w-5" />,
    submenu: [
      { title: "All Appointments", href: "/appointments" },
      { title: "Schedule New", href: "/appointments/new" },
    ],
  },
  {
    title: "Sales",
    href: "/sales",
    icon: <CreditCard className="h-5 w-5" />,
    submenu: [
      { title: "All Sales", href: "/sales" },
      { title: "New Sale", href: "/sales/new" },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard", // Redirect to dashboard for now
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 -translate-x-full md:w-16 md:translate-x-0",
      )}
    >
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className={cn("font-bold text-xl", !isOpen && "md:hidden")}>
          Optical Store
        </h1>
        {!isOpen && (
          <span className="hidden md:block font-bold text-xl">OS</span>
        )}
      </div>

      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)]">
        {navItems.map((item) => (
          <div key={item.title} className="relative">
            {item.submenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.title)}
                  className={cn(
                    "flex items-center w-full p-2 rounded-md hover:bg-gray-100 transition-colors",
                    !isOpen && "md:justify-center",
                  )}
                >
                  <span className="flex items-center">
                    {item.icon}
                    <span className={cn("ml-3", !isOpen && "md:hidden")}>
                      {item.title}
                    </span>
                  </span>
                  {isOpen && (
                    <span className="ml-auto">
                      {openSubmenu === item.title ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </button>
                {openSubmenu === item.title && isOpen && (
                  <div className="pl-10 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <NavLink
                        key={subItem.title}
                        to={subItem.href}
                        className={({ isActive }) =>
                          cn(
                            "block p-2 rounded-md hover:bg-gray-100 transition-colors",
                            isActive && "bg-gray-100 font-medium",
                          )
                        }
                      >
                        {subItem.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors",
                    isActive && "bg-gray-100 font-medium",
                    !isOpen && "md:justify-center",
                  )
                }
              >
                {item.icon}
                <span className={cn("ml-3", !isOpen && "md:hidden")}>
                  {item.title}
                </span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
