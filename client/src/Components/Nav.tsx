import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex flex-row items-center justify-between h-16 px-10 shadow-sm bg-white">
      <Link to="/" className="text-xl text-gray-800 font-bold tracking-wide">
        VibeCart
      </Link>

      <div className="flex items-center gap-6 text-lg">
        <Link to="/" className="hover:text-blue-500 transition">
          Home
        </Link>
        <Link to="/cart" className="relative">
          <IoBagOutline className="text-2xl" />
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            2
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
