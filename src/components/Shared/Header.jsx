// images
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatars/avatar_1.png";

// icons
import homeIcon from "../../assets/icons/home.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import LogOut from "../common/LogOut";
import { useAuth } from "../../Hooks/useAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const { auth } = useAuth();
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Logo */}
        <img
          className="max-w-[100px] rounded-full lg:max-w-[130px]"
          src={logo}
          alt="Logo"
        />

        {/* Nav links */}
        <div className="flex items-center space-x-4">
          <button className="btn-primary">
            <img src={homeIcon} alt="Home" />
            Home
          </button>

          <button className="icon-btn">
            <img src={notificationIcon} alt="Notification" />
          </button>

          <LogOut></LogOut>

          <Link
            to="/me"
            className="flex-center !ml-8 gap-3 hover:opacity-80 transition-all"
          >
            {/* নাম - এখন এটিও ক্লিকেবল */}
            <span className="text-lg font-medium lg:text-xl">
              {auth?.user?.firstName} {auth?.user?.lastName}
            </span>

            {/* ছবি - ডাইনামিক করার চেষ্টা করুন */}
            <img
              className="max-h-[32px] max-w-[32px] rounded-full lg:max-h-[44px] lg:max-w-[44px]"
              src={auth?.user?.avatar || avatar} // যদি ইউজারের ছবি থাকে তবে সেটা, নাহলে ডিফল্ট
              alt="Profile"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
