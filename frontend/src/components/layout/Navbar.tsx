import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const navLink =
    "text-gray-300 hover:text-white transition-colors duration-200";

  const activeLink = "text-white font-semibold";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0B0F]/80 border-b border-gray-800">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-white"
        >
          Fix<span className="text-indigo-500">Mate</span>
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-8">
          <Link
            to="/"
            className={`${navLink} ${
              pathname === "/" ? activeLink : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/login"
            className={`${navLink} ${
              pathname === "/login" ? activeLink : ""
            }`}
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 px-5 py-2 rounded-lg font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;