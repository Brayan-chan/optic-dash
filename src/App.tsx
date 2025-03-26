import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";

// Lazy load pages for better performance
const Home = lazy(() => import("./components/home"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Customers = lazy(() => import("./pages/customers"));
const Products = lazy(() => import("./pages/products"));
const Appointments = lazy(() => import("./pages/appointments"));
const Sales = lazy(() => import("./pages/sales"));
const Reports = lazy(() => import("./pages/reports"));
const Repairs = lazy(() => import("./pages/repairs"));
const NewRepair = lazy(() => import("./pages/repairs/new"));
const Agreements = lazy(() => import("./pages/agreements"));
const NewAgreement = lazy(() => import("./pages/agreements/new"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/repairs" element={<Repairs />} />
          <Route path="/repairs/new" element={<NewRepair />} />
          <Route path="/agreements" element={<Agreements />} />
          <Route path="/agreements/new" element={<NewAgreement />} />
          <Route path="/reports" element={<Reports />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
