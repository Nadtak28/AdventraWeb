import { Navigate } from "react-router-dom";
import { tokenStore } from "../utils/dataStore";

export default function ProtectedRoute({ children }) {
  const token = tokenStore.getToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
