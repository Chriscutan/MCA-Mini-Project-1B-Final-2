import React from "react";
import Header from "../components/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useEffect } from "react";
import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";

function CartProducts() {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const deliveryCharge = basketTotal > 500 ? 0 : 20;
  const navigate = useNavigate();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <div className="bg-gray-100">
      <Header />

      <div className="max-w-xl h-fit mx-auto mt-3">
        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
          <CartCard
            key={key}
            id={key}
            prodImage={items[0]?.prodImage}
            name={items[0]?.productName}
            price={items[0]?.price}
          />
        ))}
      </div>
      {/* Bill */}
      <div className="flex flex-col border w-fit h-fit border-gray-300 p-3 rounded-lg bg-gray-100 fixed top-24 right-10">
        <div className="flex items-center">
          <p className="font-semibold text-gray-500 mr-5">Subtotal: </p>
          <p className="font-bold">&#8377; {basketTotal}</p>
        </div>

        <div className="flex items-center">
          <p className="font-semibold text-gray-500 mr-5">Delivery Charge: </p>
          <p className="font-bold">&#8377; {deliveryCharge}</p>
        </div>

        <div className="flex items-center">
          <p className="font-semibold text-gray-500 mr-5">Grand Total: </p>
          <p className="font-bold">&#8377; {basketTotal + deliveryCharge}</p>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-400 rounded-lg p-3 text-sm font-bold hover:scale-110 transition-all duration-200 ease-out text-white mt-3"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartProducts;
