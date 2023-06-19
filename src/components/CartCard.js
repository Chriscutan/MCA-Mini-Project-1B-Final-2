import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket, selectBasketItems } from "../features/basketSlice";

function CartCard({ id, prodImage, name, price }) {
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-3xl font-bold">Cart Products</h1>
      <div className="flex items-center justify-center mt-5 border border-gray-300 p-3 rounded-lg bg-gray-100">
        <img
          src={prodImage}
          alt="prod"
          height={150}
          width={150}
          className="rounded-lg object-contain"
        />
        <p className="font-bold ml-5 text-gray-500">x {items.length}</p>
        <p className="font-semibold ml-5">{name}</p>
        <p className="font-semibold ml-5">&#8377; {price}</p>
        <p
          onClick={() => dispatch(removeFromBasket({ id: id }))}
          className="bg-green-400 rounded-lg ml-5 p-3 text-white text-sm font-bold hover:scale-110 transition-all duration-200 ease-out cursor-pointer"
        >
          Remove
        </p>
      </div>
    </div>
  );
}

export default CartCard;
