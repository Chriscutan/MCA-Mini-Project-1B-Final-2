import React from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { BounceLoader } from "react-spinners";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../features/basketSlice";
import { useNavigate } from "react-router-dom";

function BuyProducts() {
  const [products, loading] = useCollection(collection(db, "products"));
  const items = useSelector(selectBasketItems);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      <Header />

      {loading ? (
        <BounceLoader color="#36d7b7" size={60} className="mt-3 mx-auto" />
      ) : (
        <div className="max-w-5xl flex items-center justify-evenly flex-wrap mt-5 mx-auto">
          {products?.docs.map((doc) => (
            <ProductCard
              key={doc.id}
              id={doc.id}
              prodImage={doc.data().prodImage}
              farmerName={doc.data().farmerName}
              productName={doc.data().productName}
              harvestDate={doc.data().harvestDate}
              expiryDate={doc.data().expiryDate}
              harvestLocation={doc.data().harvestLocation}
              price={doc.data().price}
              quantity={doc.data().quantity}
              stock={doc.data().stock}
            />
          ))}
        </div>
      )}

      {/*Cart Icon  */}
      <div
        onClick={() => navigate("/cartProducts")}
        className="flex items-center justify-between w-[130px] bg-green-400 rounded-lg p-3 text-white fixed top-24 right-10 cursor-pointer hover:scale-110 transition-all duration-200 ease-out"
      >
        <div className="flex items-center mr-3">
          <ShoppingCartIcon className="h-6 w-6 text-white" />
          <p className="text-sm font-semibold">{items.length}</p>
        </div>
        <p className="text-sm font-bold">Checkout</p>
      </div>
    </div>
  );
}

export default BuyProducts;
