import { Navigate } from "react-router-dom";

export const ProdectedRoutes = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProdectedRoutes;
