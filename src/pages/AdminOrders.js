import React from "react";
import AdminHeader from "../components/AdminHeader";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import OrderCard from "../components/OrderCard";
import { BounceLoader } from "react-spinners";

function AdminOrders() {
  const [user] = useAuthState(auth);
  const [orders, loading] = useCollection(
    collection(db, `orders`),
    orderBy("timestamp", "asc")
  );
  return (
    <div className="bg-gray-100 h-screen">
      <AdminHeader />

      {loading ? (
        <BounceLoader color="#36d7b7" size={60} className="mt-3 mx-auto" />
      ) : (
        <div className="max-w-5xl mx-auto mt-4">
          <h1 className="text-3xl font-bold mb-3">Orders List</h1>
          <div className="flex items-center justify-evenly flex-wrap mt-5">
            {orders?.docs.map((doc) => (
              <OrderCard
                key={doc.id}
                id={doc.id}
                name={doc.data().name}
                email={doc.data().email}
                items={doc.data().items}
                time={doc.data().timestamp?.toDate().getTime()}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
