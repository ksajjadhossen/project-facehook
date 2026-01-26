import logoutIcon from "../../assets/icons/logout.svg";
import { useNavigate } from "react-router-dom";
const LogOut = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/login");
  };
  return (
    <button className="icon-btn" onClick={handleLogOut}>
      <img src={logoutIcon} alt="Logout" />
    </button>
  );
};

export default LogOut;
