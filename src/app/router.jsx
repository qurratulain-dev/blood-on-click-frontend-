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
import { EditProfile } from "@/features/bloodBank/components/EditProfile";
import { ManageStock } from "@/features/bloodBank/components/ManageStock";
import { ViewRequests } from "@/features/bloodBank/components/ViewRequests";
import { BankNotifications } from "@/features/bloodBank/components/Notifications";
import { Reports } from "@/features/bloodBank/components/Reports";
import { DonorDashboard } from "@/features/donor/components/DonorDashboard";
import { DonationHistory } from "@/features/donor/components/DonationHistory";
import { EditProfile as DonorEditProfile } from "@/features/donor/components/EditProfile";
import { SearchBanks } from "@/features/donor/components/SearchBanks";
import { MedicalReports } from "@/features/donor/components/MedicalReports";
import { Notifications as DonorNotifications } from "@/features/donor/components/Notifications";
import { SeekerDashboard } from "@/features/seeker/components/SeekerDashboard";
import { NotFoundPage } from "@/features/not-found/NotFoundPage";
import { SearchBanks as SeekerSearchBanks } from "@/features/seeker/components/SearchBanks";
import { SearchDonors as SeekerSearchDonors } from "@/features/seeker/components/SearchDonors";
import { Notifications as SeekerNotifications } from "@/features/seeker/components/Notifications";

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
      { path: "*", element: <NotFoundPage /> },
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
      { path: "/blood-bank/edit-profile", element: <EditProfile /> },
      { path: "/blood-bank/manage-stock", element: <ManageStock /> },
      { path: "/blood-bank/view-requests", element: <ViewRequests /> },
      { path: "/blood-bank/notifications", element: <BankNotifications /> },
      { path: "/blood-bank/reports", element: <Reports /> },
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
      { path: "/donor/edit-profile", element: <DonorEditProfile /> },
      { path: "/donor/search-banks", element: <SearchBanks /> },
      { path: "/donor/medical-reports", element: <MedicalReports /> },
      { path: "/donor/donation-history", element: <DonationHistory /> },
      { path: "/donor/notifications", element: <DonorNotifications /> },
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
      { path: "/seeker/search-donors", element: <SeekerSearchDonors /> },
      { path: "/seeker/search-banks", element: <SeekerSearchBanks /> },
      { path: "/seeker/notifications", element: <SeekerNotifications /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
