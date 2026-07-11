import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Fix<span className="text-indigo-500">Mate</span>
            </h2>

            <p className="mt-2 text-sm text-gray-400 max-w-sm">
              Connecting users with trusted workers through a secure and
              seamless platform.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-8 text-gray-400">
            <Link
              to="/"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="hover:text-white transition-colors duration-200"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="hover:text-white transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 text-xl text-gray-400">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FixMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;