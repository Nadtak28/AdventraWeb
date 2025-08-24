import { Navigate } from "react-router-dom";
import { tokenStore } from "../utils/dataStore";

export default function GuestRoute({ children }) {
  const token = tokenStore.getToken();

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
