import { Navigate } from "react-router-dom"
import { ROUTE_ADMIN_HOSPITAL } from ".";

export const AdminMain = () => {
    return <Navigate to={ROUTE_ADMIN_HOSPITAL} />
}