import React from "react";
import Navigationbar from "../Navigationbar/Navigationbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup");
  return (
    <div>
      {noHeaderFooter || <Navigationbar></Navigationbar>}

      <Outlet></Outlet>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Layout;
