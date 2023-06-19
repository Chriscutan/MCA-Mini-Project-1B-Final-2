import { Card, Text } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../features/basketSlice";
import CartCard from "../components/CartCard";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, query, serverTimestamp } from "firebase/firestore";

function Checkout() {
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const processPayment = () => {
    setShowModal(true);

    const q = query(collection(db, `orders`));

    addDoc(q, {
      name: user.displayName,
      email: user.email,
      items: items,
      timestamp: serverTimestamp(),
    }).catch((err) => alert(err.message));
  };

  return (
    <div className="max-w-6xl mx-auto h-screen flex justify-center p-12 bg-gray-100">
      <div>
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

      <div className="flex-1 ml-5">
        <Card
          decoration="top"
          decorationColor="indigo"
          className="!bg-gray-100 text-center !max-w-xl"
        >
          <div className="flex-1 flex flex-col items-center space-y-3">
            <input
              type="text"
              placeholder="Name"
              className="inputStyle w-[80%]"
            />
            <input
              type="text"
              placeholder="Mobile"
              className="inputStyle w-[80%]"
            />
            <textarea placeholder="Addresss" className="inputStyle w-[80%]" />
          </div>
          <div className="flex-1 flex flex-col items-center space-y-3">
            <Text className="!text-3xl font-bold mt-3">Card Details</Text>

            <input
              type="text"
              placeholder="0000-0000-0000"
              className="inputStyle w-[70%]"
            />
            <input
              type="text"
              placeholder="MM-YY"
              className="inputStyle w-[70%]"
            />
            <input
              type="text"
              placeholder="CVV"
              className="inputStyle w-[70%]"
            />
            <input
              type="text"
              placeholder="Card Holder Name"
              className="inputStyle w-[70%]"
            />
            <button
              onClick={processPayment}
              className="bg-green-400 rounded-lg p-3 text-sm font-bold w-[70%] hover:scale-110 transition-all duration-200 ease-out text-white mt-3"
            >
              Process Payment
            </button>
          </div>
        </Card>
      </div>

      {/* Payment Card */}
      {showModal && (
        <div className="fixed top-24 mx-auto z-50">
          <Card
            decoration="top"
            decorationColor="green"
            className="!bg-white text-center"
          >
            <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto" />
            <Text>Payment Successfull!!!</Text>
            <Text>
              Your order has been received on {new Date().toString()} and will
              be delivered within 1 day
            </Text>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/");
              }}
              className="bg-green-400 rounded-lg p-3 text-sm font-bold w-[70%] hover:scale-110 transition-all duration-200 ease-out text-white mt-3"
            >
              Close
            </button>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Checkout;
