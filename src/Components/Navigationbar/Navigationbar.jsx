import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import useCart from "../Hooks/useCart";

const Navigationbar = () => {
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
      <div className="navbar bg-red-700">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-white text-3xl font-mono">
            Grocery Store
          </a>
          <div className="flex-1 flex justify-center items-center">
            <div className="form-control w-full h-9  mx-auto">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered text-center w-10/12"
              />
            </div>
          </div>
        </div>
        <div>
          <NavLink to="/" className="text-white font-semibold me-4 text-xl">
            Home
          </NavLink>
          {!user ? (
            <NavLink
              to="/login"
              className="text-white font-semibold me-4 text-xl"
            >
              Log in
            </NavLink>
          ) : (
            ""
          )}
        </div>
        <div className="flex-none me-10">
          <div className="dropdown dropdown-end">
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
            <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">Items: {cart?.length}</span>
                <span className="text-green-600 font-bold text-xl">
                  $ {total}
                </span>
                <div className="card-actions">
                  <NavLink to="/cart">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end ms-7">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full flex justify-center items-center">
                {user ? (
                  <img src={user.photoURL} alt="Avatar" />
                ) : (
                  <FaUserCircle className="text-4xl" />
                )}
              </div>
            </label>
            {user ? (
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
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
