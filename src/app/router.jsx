import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { BloodBankLayout } from "@/components/layout/BloodBankLayout";
import { DonorLayout } from "@/components/layout/DonorLayout";
import { SeekerLayout } from "@/components/layout/SeekerLayout";
import { HomePage } from "@/features/landing/components/HomePage";
import { RegisterPage } from "@/features/auth/components/registration/RegisterPage";
import { LoginPage } from "@/features/auth/components/login/LoginPage";
import { AdminDashboard } from "@/features/admin/components/AdminDashboard";

const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    element: (
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    ),
    children: [
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/admin/users/add", element: <AdminDashboard /> },
      { path: "/admin/users", element: <AdminDashboard /> },
      { path: "/admin/donations", element: <AdminDashboard /> },
      { path: "/admin/assessments", element: <AdminDashboard /> },
      { path: "/admin/assessments/new", element: <AdminDashboard /> },
      { path: "/admin/recommend-bank", element: <AdminDashboard /> },
    ],
  },
  {
    element: (
      <BloodBankLayout>
        <Outlet />
      </BloodBankLayout>
    ),
    children: [
      { path: "/blood-bank", element: <div className="p-8 text-center text-gray-500">Blood Bank Dashboard</div> },
      { path: "/blood-bank/edit-profile", element: <div className="p-8 text-center text-gray-500">Edit Profile</div> },
      { path: "/blood-bank/manage-stock", element: <div className="p-8 text-center text-gray-500">Manage Stock</div> },
      { path: "/blood-bank/view-requests", element: <div className="p-8 text-center text-gray-500">View Requests</div> },
      { path: "/blood-bank/notifications", element: <div className="p-8 text-center text-gray-500">Notifications</div> },
      { path: "/blood-bank/reports", element: <div className="p-8 text-center text-gray-500">Reports</div> },
    ],
  },
  {
    element: (
      <DonorLayout>
        <Outlet />
      </DonorLayout>
    ),
    children: [
      { path: "/donor", element: <div className="p-8 text-center text-gray-500">Donor Dashboard</div> },
      { path: "/donor/edit-profile", element: <div className="p-8 text-center text-gray-500">Edit Profile</div> },
      { path: "/donor/search-banks", element: <div className="p-8 text-center text-gray-500">Search Banks</div> },
      { path: "/donor/medical-reports", element: <div className="p-8 text-center text-gray-500">Medical Reports</div> },
      { path: "/donor/donation-history", element: <div className="p-8 text-center text-gray-500">Donation History</div> },
      { path: "/donor/notifications", element: <div className="p-8 text-center text-gray-500">Notifications</div> },
    ],
  },
  {
    element: (
      <SeekerLayout>
        <Outlet />
      </SeekerLayout>
    ),
    children: [
      { path: "/seeker", element: <div className="p-8 text-center text-gray-500">Seeker Dashboard</div> },
      { path: "/seeker/search-donors", element: <div className="p-8 text-center text-gray-500">Search Donors</div> },
      { path: "/seeker/search-banks", element: <div className="p-8 text-center text-gray-500">Search Banks</div> },
      { path: "/seeker/notifications", element: <div className="p-8 text-center text-gray-500">Notifications</div> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
