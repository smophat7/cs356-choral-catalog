import { Navigate, Route, Routes } from "react-router-dom";

import { RouteEndpoints, Song } from "../types";
import Catalog from "../views/Catalog";

interface Props {
  songs: Song[];
}

const AppRoutes: React.FC<Props> = ({ songs }) => {
  return (
    <Routes>
      {/* Reroute to a page on index */}
      <Route
        path="/"
        element={<Navigate to={RouteEndpoints.Catalog} replace={true} />}
      />
      <Route path="*" element={<Navigate to="/" />} />

      <Route
        path={RouteEndpoints.Catalog}
        element={<Catalog songs={songs} />}
      />
    </Routes>
  );
};

export default AppRoutes;
