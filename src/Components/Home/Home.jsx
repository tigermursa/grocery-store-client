import React from "react";
import Products from "../Products/Products";
import Drawer from "../Drawer/Drawer";
import SimpleSlider from "../ReactSlick/ReactSlick";

const Home = () => {
  return (
    <div>
      <SimpleSlider/>
      <Products />
    </div>
  );
};

export default Home;
