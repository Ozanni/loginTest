import { RouteObject } from "react-router-dom";
import { LoginGuard } from "../features/auth/components/LoginGuard";
import { AdminRoutes, ROUTE_ADMIN } from "../features/admin";

const App = () => {
    return (
        <LoginGuard>
            <AdminRoutes />
        </LoginGuard>
    )
}

export const adminRoutes: RouteObject[] = [
    {
        path: `${ROUTE_ADMIN}/*`,
        element: <App />
    }
]
