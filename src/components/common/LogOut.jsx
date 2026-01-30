import logoutIcon from "../../assets/icons/logout.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
const LogOut = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogOut = () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <button className="icon-btn" onClick={handleLogOut}>
      <img src={logoutIcon} alt="Logout" />
    </button>
  );
};

export default LogOut;
