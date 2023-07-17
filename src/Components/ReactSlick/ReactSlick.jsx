// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable automatic movement
    autoplaySpeed: 3000, // Set the time between each slide (in milliseconds)
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img
            className="w-full h-96 object-cover"
            src="/public/carousel/supermarket-435452_1280.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-96 object-scale-down"
            src="/public/carousel/pic1.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-96 object-scale-down"
            src="/public/carousel/pic2.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-96 object-scale-down"
            src="/public/carousel/pic3.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-96 object-cover"
            src="/public/carousel/pic8.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-96 object-scale-down"
            src="/public/carousel/pic4.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-96 object-scale-down"
            src="/public/carousel/pic5.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-96 object-scale-down"
            src="/public/carousel/pic6.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-96 object-cover"
            src="/public/carousel/pic7.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-96 object-cover"
            src="https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
            alt=""
          />
        </div>

      </Slider>
    </div>
  );
}
