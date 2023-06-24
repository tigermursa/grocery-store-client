import React, { useContext, useEffect, useState } from "react";
import useCart from "../Hooks/useCart";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import CountUp from 'react-countup';

const Home = () => {
  const [items, setItems] = useState([]);
  const [cart, refetch] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0).toFixed(2);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddToCart = (data) => {
    if (user && user.email) {
      const cartItem = {
        itemName: data.itemName,
        description: data.description,
        quantity: data.quantity,
        image: data.image,
        price: data.price,
        email: user.email,
      };
      fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            // Swal.fire({
            //   position: "center",
            //   icon: "success",
            //   title: "Item added",
            //   text: ` 1 ${cartItem.itemName}`,
            //   showConfirmButton: false,
            //   timer: 2500,
            //   //- $${cartItem.price}
            // });
          } else {
            // Swal.fire({
            //   icon: "info",
            //   title: "Oops...",
            //   text: "This item is already in your selected list!",
            // });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to select",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div className="bg-white rounded shadow" key={item._id}>
            <img className="w-full h-48 object-scale-down" src={item.image} alt="" />
            <div className="p-4">
              <div className="font-bold text-xl mb-2">{item.itemName}</div>
              <p className="text-gray-700 text-base">Price: ${item.price}</p>
              <p className="text-gray-700 text-base">
                Description: {item.description}
              </p>
              <p className="text-gray-700 text-base">
                Quantity: {item.quantity}
              </p>
            </div>
            <div className="flex justify-center items-center space-x-4 p-4">
              <button
                className="bg-blue-800 text-white px-4 py-2 rounded-lg"
                onClick={() => handleAddToCart(item)}
              >
                Add item
              </button>
              <div>
                <button
                  className="bg-black text-white px-4 py-2 rounded-lg hidden"
                  onClick={() => handleAddToCart(item)}
                >
                  {cart?.length}
                </button>
              </div>
              <button
                className="bg-pink-800 text-white px-4 py-2 rounded-lg hidden"
                onClick={() => handleAddToCart(item)}
              >
                Remove item
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-3 right-3 z-10 top-96 hidden md:block ">
        <div className="mt-3 z-[1] card card-compact dropdown-content w-52  shadow flex justify-center items-center bg-transparent">
          <div className="card-body">
            <span className="font-bold text-lg">Items: {cart?.length}</span>
            <CountUp className="text-lg font-semibold" start={0} end={Number(total)} duration={2.5} decimals={2} prefix="$" />
            <div className="card-actions">
              <NavLink to="/cart">
                <button className="btn btn-outline btn-secondary btn-block">View cart</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-3 right-3 z-10 top-96  md:hidden ">
        <div className="mt-3 z-[1] card card-compact dropdown-content w-36 shadow flex justify-center items-center bg-transparent">
          <div className="card-body">
            <span className="font-bold text-sm hidden">Items: {cart?.length}</span>
            <CountUp className="text-lg font-semibold" start={0} end={Number(total)} duration={2.5} decimals={2} prefix="$" />
            <div className="card-actions">
              <NavLink to="/cart">
                <button className="btn btn-outline btn-secondary btn-block hidden">View cart</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
