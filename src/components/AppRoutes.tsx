import { Navigate, Route, Routes } from "react-router-dom";

import { RouteEndpoints } from "../types";
import Catalog from "../views/Catalog";
import MyLibrary from "../views/MyLibrary";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Reroute to a page on index */}
      <Route
        path="/"
        element={<Navigate to={RouteEndpoints.Catalog} replace={true} />}
      />
      <Route path="*" element={<Navigate to="/" />} />

      <Route path={RouteEndpoints.Catalog} element={<Catalog />} />
      <Route path={RouteEndpoints.MyLibrary} element={<MyLibrary />} />
    </Routes>
  );
};

export default AppRoutes;
