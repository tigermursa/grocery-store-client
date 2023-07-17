import React, { useContext, useEffect, useState, useRef } from "react";
import useCart from "../Hooks/useCart";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-default.css";
import Swal from "sweetalert2";

const Home = () => {
  const [items, setItems] = useState([]);
  const [cart, refetch] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0).toFixed(2);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deletingItemId, setDeletingItemId] = useState(null);
  const odometerRef = useRef(null);

  const handleDelete = (item) => {
    setDeletingItemId(item._id);

    fetch(`https://successful-hem-boa.cyclic.app/cart/${item._id}`, {
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

  useEffect(() => {
    fetch("https://successful-hem-boa.cyclic.app/items")
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
      fetch("https://successful-hem-boa.cyclic.app/cart", {
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
          }
        });
    } else {
      Swal.fire({
        title: "Please login to add items to your cart",
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

  const groupedItems = cart.reduce((grouped, item) => {
    if (grouped[item.itemName]) {
      grouped[item.itemName].quantity += 1;
    } else {
      grouped[item.itemName] = { ...item, quantity: 1 };
    }
    return grouped;
  }, {});

  const itemList = Object.values(groupedItems);

  useEffect(() => {
    if (odometerRef.current) {
      odometerRef.current.update(total);
    }
  }, [total]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div 
            className={`bg-white rounded shadow ${
              deletingItemId === item._id ? "deleting" : ""
            }`}
            key={item._id}
          >
            <img
              className="w-full h-48 object-scale-down"
              src={item.image}
              alt=""
            />
            <div className="p-4 ">
              <div className="font-bold text-xl mb-2 ">{item.itemName}</div>
              <p className="text-gray-700 text-base font-bold ">
                Price: ${item.price}
              </p>
              <p className="text-gray-700 text-base hidden">
                Description: {item.description}
              </p>
              <p className="text-gray-700  text-sm font-semibold ">
                Quantity: {item.quantity}
              </p>
            </div>
            <div className="flex justify-center items-center rounded-full space-x-4 p-4">
              {itemList.some(
                (cartItem) => cartItem.itemName === item.itemName
              ) ? (
                <div className="flex items-center  ">
                  <button
                    className="bg-blue-800 hover:bg-blue-950 text-white px-4 py-2 border-2 border-black items-center gap-4 font-bold"
                    onClick={() => handleAddToCart(item)}
                  >
                    +
                  </button>

                  {itemList.map(
                    (cartItem) =>
                      cartItem.itemName === item.itemName && (
                        <div key={item._id} className="flex">
                          <div className="bg-blue-800 hover:bg-blue-600 text-white px-4 py-2  flex items-center w-40 text-center justify-center font-bold">
                            {cartItem.quantity} in bag
                          </div>
                          <div
                            key={cartItem._id}
                            className={` rounded-full bg-none flex justify-center items-center  ${
                              deletingItemId === cartItem._id ? "deleting" : ""
                            }`}
                          >
                            <div>
                              <button
                                className="bg-blue-800 hover:bg-blue-950 text-white px-4 py-2  flex items-center border-black border-2 font-bold"
                                onClick={() => handleDelete(cartItem)}
                              >
                                -
                              </button>
                            </div>
                          </div>{" "}
                        </div>
                      )
                  )}
                </div>
              ) : (
                <button
                  className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center gap-4 w-64 justify-center "
                  onClick={() => handleAddToCart(item)}
                >
                  <FaShoppingCart /> Add To Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
{/* side bag for pc/larger device */}
      <div className="fixed bottom-3 right-3 z-10 top-96 hidden md:block  ">
        <div className="mt-3 z-[1] card card-compact dropdown-content w-40  h-28 shadow flex justify-center items-center  bg-white bg-opacity-60 ">
          <div className="card-body">
            <span className="font-bold text-lg items-center flex gap-2">
              {" "}
              <FaShoppingBag /> Items: {cart?.length}
            </span>
            <div className="text-lg font-semibold">
              <span className="font-bold me-1">$</span>
              <Odometer
                value={Number(total)}
                format="(,ddd).dd"
                
                ref={odometerRef}
              />
            </div>
            <div className="card-actions">
              <NavLink to="/cart">
                <button className="btn btn-outline  btn-block btn-xs mt-1">
                  View cart
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* side bag for small device */}
      <div className="fixed bottom-3 right-3 z-10 top-96  md:hidden  ">
        <div className="mt-3 z-[1] card card-compact dropdown-conte nt w-28 h-10 shadow flex justify-center items-center bg-transparent">
          <div className="card-body">
            <span className="font-bold text-sm hidden">
              Items:{cart?.length}
            </span>

            <div className="text-lg font-semibold">
            <span className="font-bold me-1">$</span>
              <Odometer
                value={Number(total)}
                format="(,ddd).dd"
                ref={odometerRef}
              />
            </div>
            <div className="card-actions">
              <NavLink to="/cart">
                <button className="btn btn-outline btn-secondary btn-block hidden ">
                  View carts
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
