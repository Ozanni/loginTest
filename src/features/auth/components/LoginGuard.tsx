import { useSelector } from "react-redux"
import { selectToken } from "../../../stores/auth/authSelector"
import { Navigate } from "react-router-dom";
import { ROUTE_LOGIN } from "..";
import { ReactNode } from "react";

export const LoginGuard = ({ children }: { children: ReactNode}) => {
    const token = useSelector(selectToken);
    if (!token) return <Navigate to={ROUTE_LOGIN} />;

    return <>{children}</>;
}