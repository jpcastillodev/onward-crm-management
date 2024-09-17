import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { getCSSVariableValue } from "../_metronic/assets/ts/_utils";
import { WithChildren } from "../_metronic/helpers";
import { useAuth } from "../providers";

const PrivateRoutes = () => {

  const { hasRequiredRole } = useAuth()


  const UsersPage = lazy(() => import("../pages/users/UsersPage"));



  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardWrapper />} />
        {/* <Route
          path="/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        /> */}

        {/* {hasRequiredRole(1) && (
          <>
            <Route
              path="/super/tenant/*"
              element={
                <SuspensedView>
                  <Tenant />
                </SuspensedView>
              }
            />
            <Route
              path="/super/plans/*"
              element={
                <SuspensedView>
                  <Plans />
                </SuspensedView>
              }
            />
          </>
        )} */}
        <Route
          path="/users/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />


        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};



const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 2,
    shadowBlur: 5,
  });

  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
