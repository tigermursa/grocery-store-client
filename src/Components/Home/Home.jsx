import React, { useContext, useEffect, useState } from "react";
import useCart from "../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
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
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Item added",
              text: ` 1 ${cartItem.itemName}`,
              showConfirmButton: false,
              timer: 2500,
              //- $${cartItem.price}
            });
          } else {
            Swal.fire({
              icon: "info",
              title: "Oops...",
              text: "This item is already in your selected list!",
            });
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
    <div className="">
      <div className="flex grid-cols-3 gap-4  items-center justify-evenly">
        {items.map((item) => (
          <div
            className="max-w-xs h-auto pb-10 rounded overflow-hidden shadow-lg text-start"
            key={item._id}
          >
            <img
              className="w-full h-48 object-scale-down"
              src={item.image}
              alt=""
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.itemName}</div>
              <p className="text-gray-700 text-base">Price: ${item.price}</p>
              <p className="text-gray-700 text-base">
                Description: {item.description}
              </p>
              <p className="text-gray-700 text-base">
                Quantity: {item.quantity}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <button
                className={`mt-7 bg-blue-800 text-white px-4 py-2 rounded-lg`}
                onClick={() => handleAddToCart(item)}
              >
                Add item
              </button>
              <div>
                <button
                  className={`mt-7 bg-black text-white px-4 py-2 rounded-lg hidden`}
                  onClick={() => handleAddToCart(item)}
                >
                  {cart?.length}
                </button>
              </div>
              <button
                className={`mt-7 bg-pink-800 text-white px-4 py-2 rounded-lg hidden`}
                onClick={() => handleAddToCart(item)}
              >
                Remove item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
