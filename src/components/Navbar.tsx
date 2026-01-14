import { useState } from "react";
import { BiHome, BiInfoCircle } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { FaSignOutAlt } from "react-icons/fa";
import { GrDashboard } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { clearCredentials } from "../features/auth/authSlice";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated,user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(clearCredentials());
        navigate("/");
    };


    return (
       <div className="navbar bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg sticky top-0 z-50 px-4">
  {/* Navbar Start */}
  <div className="navbar-start">
    {/* Mobile Dropdown */}
    <div className="dropdown">
      <button
        tabIndex={0}
        className="btn btn-ghost lg:hidden text-white hover:bg-red-600"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {isMenuOpen && (
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-white text-red-700 rounded-box w-56"
        >
          <li>
            <a href="/" className="hover:text-red-600" onClick={closeMenu}>
              <BiHome className="mr-2" />
              Home
            </a>
          </li>
          <li>
              <Link to="/foods" className="hover:text-red-600" onClick={closeMenu}>
               <BiInfoCircle className="mr-2" />
              Meals
              </Link>
            {/* <a href="/foods" className="hover:text-red-600" onClick={closeMenu}>
              <BiInfoCircle className="mr-2" />
              Meals
            </a> */}
          </li>
          <li>
            <a href="/newMeals" className="text-red-700 font-semibold" onClick={closeMenu}>
              New Meals
            </a>
          </li>
          <li className="divider my-2"></li>
          <li>
            <a href="/login" onClick={closeMenu}>
              Login
            </a>
          </li>
          <li>
            <a
              href="/register"
              className="btn bg-red-500 hover:bg-red-600 text-white border-none"
              onClick={closeMenu}
            >
              Sign Up
            </a>
          </li>
        </ul>
      )}
    </div>

    {/* Logo */}
    <a href="/" className="btn btn-ghost text-xl text-white px-2">
      <span className="font-bold bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
        FOODIEHUB 🍽️
      </span>
    </a>
  </div>

  {/* Navbar Center (Desktop) */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-3 text-white font-medium">
      <li>
        <a href="/" className="hover:text-red-200 flex items-center">
          <BiHome className="mr-1" />
          Home
        </a>
      </li>
      <li>
        <a href="/foods" className="hover:text-red-200 flex items-center">
          <BiInfoCircle className="mr-1" />
          Meals
        </a>
      </li>
      <li>
        <a href="/newMeals" className="hover:text-red-200">New Meals</a>
      </li>
      <li>
        <a href="/newServices" className="hover:text-red-200">Services</a>
      </li>
      <li>
        <a href="/newCategories" className="hover:text-red-200">Categories</a>
      </li>
    </ul>
  </div>

  {/* Navbar End (Auth) */}
  <div className="navbar-end hidden lg:flex gap-3">
    {!isAuthenticated ? (
      <>
        <a href="/login" className="btn btn-ghost text-white hover:text-red-100">
          Login
        </a>
        <a
          href="/register"
          className="btn bg-white text-red-600 hover:bg-red-100 font-semibold border-none shadow hover:shadow-md"
        >
          Sign Up
        </a>
      </>
    ) : (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost text-white flex items-center gap-2">
          <span>Hey, {user.firstName}</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white text-red-700 rounded-box w-52">
          {user.userType === 'admin' ? (
            <li>
              <Link to="/admindashboard/analytics" className="hover:text-red-500">
                <GrDashboard className="mr-2" />
                Admin Dashboard
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/dashboard/me" className="hover:text-red-500">
                <GrDashboard className="mr-2" />
                User Dashboard
              </Link>
            </li>
          )}
          <li>
            <button onClick={handleLogout} className="hover:text-red-500 flex items-center">
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
</div>

    );
};
