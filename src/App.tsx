import { useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ResetPassword } from "./pages/ResetPassword";
import AuthLayout from "./pages/auth/AuthLayout";
import { AuthLogin } from "./pages/auth/AuthLogin";
import { Admins } from "./pages/Admins/Admins";
import ProfileLayout from "./pages/ProfileLayout/ProfileLayout";
import ProfileInformation from "./pages/ProfileLayout/components/ProfileInformation";
import ProfilePassword from "./pages/ProfileLayout/components/ProfilePassword";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import { Subscriptions } from "./pages/dashboard/Subscriptions";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Stack h={"full"} bg={"rgba(255, 255, 255, 1)"}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/profile" element={<ProfileLayout />}>
            <Route path="" element={<ProfileInformation />} />
            <Route path="password" element={<ProfilePassword />} />
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="" element={<AuthLogin />} />
          </Route>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="subscribers" element={<Subscriptions />} />
            <Route path="add-admin" element={<Admins />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Stack>
  );
}

export default App;
