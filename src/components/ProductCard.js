import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../features/basketSlice";

function ProductCard({
  id,
  farmerName,
  productName,
  harvestDate,
  expiryDate,
  harvestLocation,
  price,
  quantity,
  prodImage,
  stock,
}) {
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, productName, price, farmerName, prodImage }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="max-w-[280px] p-4 items-center justify-center border mr-4 border-gray-300 rounded-lg bg-gray-100 mt-5 hover:scale-105 transition-all duration-200 ease-out">
      <div>
        <img
          src={prodImage}
          alt="pic"
          className="h-40 w-40 rounded-full object-contain"
        />
      </div>

      <div className="space-y-2 flex flex-col justify-start font-bold">
        <p className="text-sm">
          Product Name: <span className="text-sm">{productName}</span>
        </p>
        <p className="text-sm">
          Farmer Name: <span className="text-sm">{farmerName}</span>
        </p>
        <p className="text-sm">
          Harvest date: <span className="text-sm">{harvestDate}</span>
        </p>
        <p className="text-sm">
          Expiry date: <span className="text-sm">{expiryDate}</span>
        </p>
        <p className="text-sm">
          Harvested at: <span className="text-sm">{harvestLocation}</span>
        </p>
        <p className="text-sm">
          Price: <span className="text-sm">&#8377; {price}/kg</span>
        </p>
        <p className="text-sm">
          Status:{" "}
          <span
            className={
              stock < 5
                ? "text-sm font-semibold text-red-500"
                : "text-sm font-semibold text-green-500"
            }
          >
            {stock < 5 ? "Out of Stock" : "In Stock"}
          </span>
        </p>
      </div>

      <div className="w-[100%]">
        {items.length < 1 ? (
          <button
            disabled={stock < 5}
            onClick={addItemToBasket}
            className={
              stock < 5
                ? "bg-gray-300 w-[100%] mt-3 text-sm p-2 rounded-lg cursor-not-allowed"
                : "bg-green-400 w-[100%] mt-3 text-sm p-2 rounded-lg hover:scale-105 transition-all duration-200 ease-out font-semibold"
            }
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <button
              disabled={items.length <= 0}
              onClick={removeItemFromBasket}
              className="bg-green-400 p-2 mt-3 font-bold text-center rounded-3xl"
            >
              -
            </button>
            <p className="font-bold">{items.length}</p>
            <button
              disabled={items.length >= 5}
              onClick={addItemToBasket}
              className={
                items.length >= 5
                  ? "bg-gray-400 p-2 mt-3 font-bold text-center rounded-3xl cursor-not-allowed"
                  : "bg-green-400 p-2 mt-3 font-bold text-center rounded-3xl"
              }
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
