import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import AdminLayout from "./layouts/AdminLayout";

import GuestGuard from "./components/Auth/GuestGuard";
import AuthGuard from "./components/Auth/AuthGuard";

import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

import Footer from "./components/Footer";
import { BASE_URL } from "./config/constant";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
    <Footer />
  </Suspense>
);

const routes = [
  {
    exact: true,
    guard: PublicRoute,
    path: "/login",
    component: lazy(() => import("./views/Login/Login")),
  },
  {
    exact: true,
    guard: PublicRoute,
    path: "/pin",
    component: lazy(() => import("./views/Pin/Pin")),
  },
  {
    exact: true,
    guard: PublicRoute,
    path: "/home",
    component: lazy(() => import("./views/Home/Home")),
  },
  {
    path: "*",
    layout: AdminLayout,
    guard: PrivateRoute,
    routes: [
      {
        exact: true,
        path: "/dashboard",
        component: lazy(() => import("./views/dashboard/DashDefault")),
      },
      {
        exact: true,
        path: "/dashboard/staff",
        component: lazy(() => import("./views/Staff/Staff")),
      },
      {
        exact: true,
        path: "/dashboard/staff/*",
        component: lazy(() => import("./views/Staff/Staff")),
      },
      {
        exact: true,
        path: "/dashboard/timesheet",
        component: lazy(() => import("./views/Timesheet/Timesheet")),
      },

      {
        path: "*",
        exact: true,
        component: () => <Redirect to={BASE_URL} />,
      },
    ],
  },
];

export default routes;
