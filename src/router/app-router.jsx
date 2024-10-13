import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";

import SidebarLayout from "../components/layout/sidebar-layout";
import RoutePaths from "../constants/route-paths";
import { useAuthContext } from "../context";
import NotFoundPage from "../pages/errors/404";

import { GuardedRoute } from "./guarded-route";
import { ROUTES, SIDEBAR_ROUTES } from "./routes";

export default function AppRouter() {
  const { isAuth } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate to={RoutePaths.DASHBOARD} />
            ) : (
              <Navigate to={RoutePaths.LOGIN} />
            )
          }
        />
        <Route
          path={RoutePaths.DASHBOARD}
          element={
            <GuardedRoute
              isRouteAccessible={isAuth}
              redirectRoute={RoutePaths.LOGIN}
              component={<SidebarLayout />}
            />
          }
        >
          {SIDEBAR_ROUTES.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>

        {ROUTES.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={<route.component />}
          />
        ))}


        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
