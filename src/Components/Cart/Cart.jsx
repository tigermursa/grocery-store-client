import React, { useState } from "react";
import useCart from "../Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Cart.css";

const Cart = () => {
  const [cart, refetch] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0).toFixed(2);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const handleDelete = (item) => {
    setDeletingItemId(item._id);

    fetch(`http://localhost:5000/cart/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          setDeletingItemId(null);
        }
      });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "Clear Cart",
      text: "Are you sure you want to clear your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deletePromises = cart.map((item) => {
          return fetch(`http://localhost:5000/cart/${item._id}`, {
            method: "DELETE",
          });
        });

        Promise.all(deletePromises)
          .then((responses) => Promise.all(responses.map((res) => res.json())))
          .then((data) => {
            const deletedCount = data.reduce(
              (sum, response) => sum + response.deletedCount,
              0
            );
            if (deletedCount === cart.length) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Cart Cleared",
                text: "Your cart has been cleared.",
              });
            }
          });
      }
    });
  };

  const groupedItems = cart.reduce((grouped, item) => {
    if (grouped[item.itemName]) {
      grouped[item.itemName].quantity += 1;
    } else {
      grouped[item.itemName] = { ...item, quantity: 1 };
    }
    return grouped;
  }, {});

  const itemList = Object.values(groupedItems);

  return (
    <div className="md:w-3/6 mx-auto mt-7 w-full">
      <div className="uppercase font-semibold  flex justify-evenly items-center mb-10">
        <h3 className="md:text-4xl">Total Items: {cart.length}</h3>
        <h3 className="md:text-4xl">Total Price: ${total}</h3>
        <Link to="">
          <button className="btn bg-green-600 text-zinc-50 btn-md">PAY</button>
        </Link>
      </div>
      {cart.length === 0 ? (
        " "
      ) : (
        <button className="btn btn-outline" onClick={handleClearCart}>
          Clear Cart
        </button>
      )}

      {cart.length === 0 ? (
        <div className="flex flex-col items-center mt-48">
          <img className="w-52" src="/public/96758-empty-cart.gif" alt="" />
          <p className="text-center text-xl font-mono font-semibold">
            Your cart is feeling lonely, like a deserted island.<br></br> Time
            to rescue it with a shopping spree!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <div className="space-y-6">
            {itemList.map((item) => (
              <div
                key={item._id}
                className={`flex items-center  rounded p-4 shadow-md ${
                  deletingItemId === item._id ? "deleting" : ""
                }`}
              >
                <div className="mr-4">
                  <div className="mask-squircle mask w-12 h-12">
                    <img
                      src={item.image}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-black font-semibold">
                    {item.itemName} x {item.quantity}
                  </h3>
                </div>
                <div className="me-7">
                  <p className="text-black font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn bg-purple-950 hover:bg-red-700 rounded-full text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
