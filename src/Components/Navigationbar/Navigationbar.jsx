import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserCircle, FaAlignJustify, FaRegWindowClose } from "react-icons/fa";
import { BsShopWindow } from "react-icons/bs";
import useCart from "../Hooks/useCart";
import { useSpring, animated } from "react-spring";
import "./Navigationbar.css";
const Navigationbar = () => {
  // from another site
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuAnimation = useSpring({
    width: isMenuOpen ? "85%" : "0%",
    opacity: isMenuOpen ? 1 : 0,
  });

  const [activeNavItem, setActiveNavItem] = useState("home");

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  const [cart, refetch] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0).toFixed(2);
  const { user, signOutUser } = useContext(AuthContext);
  console.log(user);
  const signOutHandler = () => {
    signOutUser()
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="">
      {/* copy one */}
      <div>
        <nav className="flex items-center justify-between p-4 md:p-0 md:pt-0  bg-red-400">
          {/* Logo */}
          <div className=" items-center md:ms-32 ms-0 hidden">
            <img
              className="w-20 mr-2 rounded-full border-2 border-gray-200"
              src="logo.png"
              alt="Logo"
            />
            {/* <span className="font-bold text-lg">Your Logo</span> */}
          </div>

          {/* Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              onClick={toggleMenu}
            >
              <FaAlignJustify className="me-7 text-2xl text-black" />
            </button>

            <NavLink to="/">
              <div className="btn btn-ghost normal-case text-white text-3xl font-thin md:hidden ">
                <div className="flex items-center gap-2">
                  <BsShopWindow /> Grocery Store
                </div>
              </div>
            </NavLink>

            <div className="dropdown dropdown-end md:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cart?.length}
                  </span>
                </div>
              </label>
              <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow flex justify-center items-center">
                <div className="card-body">
                  <span className="font-bold text-lg">
                    Items: {cart?.length}
                  </span>
                  <span className="text-green-600 font-bold text-xl">
                    $ {total}
                  </span>
                  <div className="card-actions">
                    <NavLink to="/cart">
                      <button className="btn btn-primary btn-block ">
                        View cart
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          <animated.div
            className="md:hidden absolute top-0 left-0 h-screen w-3/4 bg-red-400 py-4 px-8"
            style={menuAnimation}
          >
            <div className="flex justify-end  mb-4">
              <button
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                onClick={toggleMenu}
              >
                <FaRegWindowClose className="text-3xl text-black " />
              </button>
            </div>
            <div className="flex flex-col justify-start items-start">
              <div>
                <div className="dropdown dropdown-end ">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full flex justify-center items-center">
                      {user ? (
                        <img
                          title={user.displayName}
                          src={user.photoURL}
                          alt="Avatar"
                        />
                      ) : (
                        <FaUserCircle className="text-4xl" />
                      )}
                    </div>
                  </label>
                </div>
              </div>
              <div
                href="#home"
                className={`block mt-4 ${
                  activeNavItem === "home"
                    ? "text-gray-700"
                    : "text-black font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("home")}
              >
                Home
              </div>
              <div
                href="#about"
                className={`block mt-4 ${
                  activeNavItem === "about"
                    ? "text-gray-700"
                    : "text-black font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("about")}
              >
                About Us
              </div>
              <div
                href="#services"
                className={`block mt-4 ${
                  activeNavItem === "services"
                    ? "text-gray-700"
                    : "text-black font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("services")}
              >
                Services
              </div>
              <div
                href="#clients"
                className={`block mt-4 ${
                  activeNavItem === "clients"
                    ? "text-gray-700"
                    : "text-black font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("clients")}
              >
                Clients
              </div>
              <div
                href="#careers"
                className={`block mt-4 ${
                  activeNavItem === "careers"
                    ? "text-gray-700"
                    : "text-black font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("careers")}
              >
                Careers
              </div>
              <div
                href="#blogs"
                className={`block mt-4 ${
                  activeNavItem === "blogs"
                    ? "text-gray-700"
                    : "text-black font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("blogs")}
              >
                Blogs
              </div>
              <div
                href="#contact"
                className={`block mt-4 ${
                  activeNavItem === "contact"
                    ? "text-gray-700"
                    : "text-black font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("contact")}
              >
                Contact Us
              </div>
              <div
                href="#logout"
                className={`block mt-4 ${
                  activeNavItem === "contact"
                    ? "text-gray-700"
                    : "text-black font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("logout")}
              >
                {user ? (
                  <NavLink onClick={signOutHandler}>Logout</NavLink>
                ) : (
                  " "
                )}
              </div>
              <div
                href="#logout"
                className={`block mt-4 ${
                  activeNavItem === "contact"
                    ? "text-gray-700"
                    : "text-black font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("logout")}
              >
                {!user ? (
                  <NavLink
                    to="/login"
                    className="text-white font-semibold me-4 text-xl "
                  >
                    Log in
                  </NavLink>
                ) : (
                  ""
                )}
              </div>
            </div>
          </animated.div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:hidden  md:items-center md:justify-end w-full md:w-auto mt-4 md:mt-0 font-semibold me-6  ">
            <div
              href="#home"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "home" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("home")}
            >
              Home
            </div>
            <div
              href="#about"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "about" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("about")}
            >
              About Us
            </div>
            <div
              href="#services"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "services" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("services")}
            >
              Services
            </div>
            <div
              href="#clients"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "clients" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("clients")}
            >
              Clients
            </div>
            <div
              href="#careers"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "careers" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("careers")}
            >
              Careers
            </div>
            <div
              href="#blogs"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "blogs" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("blogs")}
            >
              Blogs
            </div>
            <div
              href="#contact"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "contact" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("contact")}
            >
              Contact Us
            </div>
          </div>
        </nav>
      </div>
      {/* main nav */}
      <div className="navbar bg-red-400">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-white text-3xl font-mono hidden md:block"
          >
            <div className="flex items-center gap-2">
              <BsShopWindow /> Grocery Store
            </div>
          </Link>
          <div className="flex-1 flex justify-center items-center pb-4">
            <div className="form-control w-full h-9  mx-auto hidden md:block">
              <input
                type="text"
                placeholder="Search items"
                className="input input-bordered text-center w-10/12"
                readOnly
              />
            </div>
          </div>
        </div>
        <div>
          <NavLink
            to="/"
            className="text-white font-semibold me-4 text-xl hidden md:block"
          >
            Home
          </NavLink>
          {!user ? (
            <NavLink
              to="/login"
              className="text-white font-semibold me-4 text-xl hidden md:block "
            >
              Log in
            </NavLink>
          ) : (
            ""
          )}
        </div>
        <div className="flex-none me-10">
          <div className="dropdown dropdown-end hidden md:block">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart?.length}
                </span>
              </div>
            </label>
            <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow flex justify-center items-center">
              <div className="card-body">
                <span className="font-bold text-lg">Items: {cart?.length}</span>
                <span className="text-green-600 font-bold text-xl">
                  $ {total}
                </span>
                <div className="card-actions">
                  <NavLink to="/cart">
                    <button className="btn btn-primary btn-block ">
                      View cart
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end ms-7 hidden md:block">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full flex justify-center items-center">
                {user ? (
                  <img
                    title={user.displayName}
                    src={user.photoURL}
                    alt="Avatar"
                  />
                ) : (
                  <FaUserCircle className="text-4xl" />
                )}
              </div>
            </label>
            {user ? (
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <div className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </div>
                </li>
                <li>
                  <div>Settings</div>
                </li>
                <li>
                  <NavLink onClick={signOutHandler}>Logout</NavLink>
                </li>
              </ul>
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigationbar;
