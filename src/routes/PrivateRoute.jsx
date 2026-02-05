import { useAuth } from "../Hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Shared/Header";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoute = () => {
  const { auth } = useAuth();
  const location = useLocation(); // ইউজার যে পেজে যেতে চেয়েছিল তা মনে রাখার জন্য

  return auth?.authToken ? (
    <>
      <ProfileProvider>
        <Header></Header>
        <Outlet />
      </ProfileProvider>
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
