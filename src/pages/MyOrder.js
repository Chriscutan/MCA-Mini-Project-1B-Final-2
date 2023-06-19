import React from "react";
import Header from "../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import UserOrderCard from "../components/UserOrderCard";

function MyOrder() {
  const [user] = useAuthState(auth);

  const [orders, loading] = useCollection(
    collection(db, "orders"),
    where("email", "==", user?.email)
  );

  console.log(orders);
  return (
    <div className="bg-gray-100">
      <Header />

      <div className="mt-4 max-w-5xl mx-auto p-3 flex items-center justify-evenly flex-wrap">
        {orders?.docs.map((doc) => (
          <UserOrderCard
            key={doc.id}
            id={doc.id}
            items={doc.data().items}
            time={doc.data().timestamp?.toDate().getTime()}
            name={doc.data().name}
          />
        ))}
      </div>
    </div>
  );
}

export default MyOrder;
