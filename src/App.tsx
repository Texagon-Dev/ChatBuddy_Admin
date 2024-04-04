import { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import navhome from "./assets/subscriber.svg";
import navhomeactive from "./assets/subscriber.svg";
import { Login } from "./pages/Login";
import { ResetPassword } from "./pages/ResetPassword";
import ProtectedRoute from "./utils/Protected";
import { Sidebar } from "./components/Sidebar";
import { Subscriptions } from "./pages/Subscriptions";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [options, setOptions] = useState([
    {
      id: 0,
      title: "Subscribers",
      link: "/dashboard/subscribers",
      active: true,
      icon: navhome,
      activeIcon: navhomeactive,
    },
  ]);
  return (
    <Stack h={"full"} bg={"rgba(255, 255, 255, 1)"}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/dashboard/*"
            element={
              <Stack>
                <Sidebar options={options} setOptions={setOptions} />
                <ProtectedRoute>
                  <Routes>
                    <Route path="subscribers" element={<Subscriptions />} />
                  </Routes>
                </ProtectedRoute>
              </Stack>
            }
          />
        </Routes>
      </BrowserRouter>
    </Stack>
  );
}

export default App;
