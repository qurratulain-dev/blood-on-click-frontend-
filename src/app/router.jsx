import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { BloodBankLayout } from "@/components/layout/BloodBankLayout";
import { DonorLayout } from "@/components/layout/DonorLayout";
import { SeekerLayout } from "@/components/layout/SeekerLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { HomePage } from "@/features/landing/components/HomePage";
import { RegisterPage } from "@/features/auth/components/registration/RegisterPage";
import { LoginPage } from "@/features/auth/components/login/LoginPage";
import { AdminDashboard } from "@/features/admin/components/AdminDashboard";
import { AddUser } from "@/features/admin/components/AddUser";
import { AssessmentsList } from "@/features/admin/components/AssessmentsList";
import { NewAssessment } from "@/features/admin/components/NewAssessment";
import { ViewAssessment } from "@/features/admin/components/ViewAssessment";
import { GenerateReport } from "@/features/admin/components/GenerateReport";
import { ManageDonations } from "@/features/admin/components/ManageDonations";
import { ManageUsers } from "@/features/admin/components/ManageUsers";
import { RecommendBloodBank } from "@/features/admin/components/RecommendBloodBank";
import { BloodBankDashboard } from "@/features/bloodBank/components/BloodBankDashboard";
import { DonorDashboard } from "@/features/donor/components/DonorDashboard";
import { SeekerDashboard } from "@/features/seeker/components/SeekerDashboard";

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
      <ProtectedRoute role="Admin">
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      </ProtectedRoute>
    ),
    children: [
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/admin/users/add", element: <AddUser /> },
      { path: "/admin/users", element: <ManageUsers /> },
      { path: "/admin/donations", element: <ManageDonations /> },
      { path: "/admin/donations/:id/report", element: <GenerateReport /> },
      { path: "/admin/assessments", element: <AssessmentsList /> },
      { path: "/admin/assessments/new", element: <NewAssessment /> },
      { path: "/admin/assessments/:id", element: <ViewAssessment /> },
      { path: "/admin/recommend-bank", element: <RecommendBloodBank /> },
    ],
  },
  {
    element: (
      <ProtectedRoute role="Blood Bank">
        <BloodBankLayout>
          <Outlet />
        </BloodBankLayout>
      </ProtectedRoute>
    ),
    children: [
      { path: "/blood-bank", element: <BloodBankDashboard /> },
      { path: "/blood-bank/edit-profile", element: <div className="p-8 text-center text-gray-500">Edit Profile</div> },
      { path: "/blood-bank/manage-stock", element: <div className="p-8 text-center text-gray-500">Manage Stock</div> },
      { path: "/blood-bank/view-requests", element: <div className="p-8 text-center text-gray-500">View Requests</div> },
      { path: "/blood-bank/notifications", element: <div className="p-8 text-center text-gray-500">Notifications</div> },
      { path: "/blood-bank/reports", element: <div className="p-8 text-center text-gray-500">Reports</div> },
    ],
  },
  {
    element: (
      <ProtectedRoute role="Donor">
        <DonorLayout>
          <Outlet />
        </DonorLayout>
      </ProtectedRoute>
    ),
    children: [
      { path: "/donor", element: <DonorDashboard /> },
      { path: "/donor/edit-profile", element: <div className="p-8 text-center text-gray-500">Edit Profile</div> },
      { path: "/donor/search-banks", element: <div className="p-8 text-center text-gray-500">Search Banks</div> },
      { path: "/donor/medical-reports", element: <div className="p-8 text-center text-gray-500">Medical Reports</div> },
      { path: "/donor/donation-history", element: <div className="p-8 text-center text-gray-500">Donation History</div> },
      { path: "/donor/notifications", element: <div className="p-8 text-center text-gray-500">Notifications</div> },
    ],
  },
  {
    element: (
      <ProtectedRoute role="Seeker">
        <SeekerLayout>
          <Outlet />
        </SeekerLayout>
      </ProtectedRoute>
    ),
    children: [
      { path: "/seeker", element: <SeekerDashboard /> },
      { path: "/seeker/search-donors", element: <div className="p-8 text-center text-gray-500">Search Donors</div> },
      { path: "/seeker/search-banks", element: <div className="p-8 text-center text-gray-500">Search Banks</div> },
      { path: "/seeker/notifications", element: <div className="p-8 text-center text-gray-500">Notifications</div> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
