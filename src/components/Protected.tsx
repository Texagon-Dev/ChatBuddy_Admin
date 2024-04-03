import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
  }

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>
};

export default ProtectedRoute