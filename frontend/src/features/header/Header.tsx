import { useState } from "react";
import { useAuth } from "../../stores/context/auth.context";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Button } from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [nav, setNav] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">REACT.</h1>

      <ul className="hidden md:flex">
        <li className="p-4 cursor-pointer">Home</li>
        <li className="p-4 cursor-pointer">Company</li>
        <li className="p-4 cursor-pointer">Resources</li>
        <li className="p-4 cursor-pointer">About</li>
        <li className="p-4 cursor-pointer">Contact</li>
        {isAuthenticated && (
          <li className="p-4">
            <Button onClick={handleLogout}>Logout</Button>
          </li>
        )}
      </ul>

      {/* Hamburger Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">REACT.</h1>
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-600 cursor-pointer">Home</li>
          <li className="p-4 border-b border-gray-600 cursor-pointer">Company</li>
          <li className="p-4 border-b border-gray-600 cursor-pointer">Resources</li>
          <li className="p-4 border-b border-gray-600 cursor-pointer">About</li>
          <li className="p-4 border-b border-gray-600 cursor-pointer">Contact</li>
          {isAuthenticated && (
            <li className="p-4">
              <Button
                onClick={() => {
                  handleLogout();
                  handleNav(); // close menu after logout
                }}
              >
                Logout
              </Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
