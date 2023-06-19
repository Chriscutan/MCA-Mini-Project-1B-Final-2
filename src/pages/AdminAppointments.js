import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import AppointmentCard from "../components/AppointmentCard";
import { BounceLoader } from "react-spinners";

function AdminAppointments() {
  const [appointments, loading] = useCollection(
    collection(db, "appointments"),
    orderBy("timestamp", "asc")
  );

  console.log(appointments);
  return (
    <div className="bg-gray-100">
      <AdminHeader />
      {loading ? (
        <BounceLoader color="#36d7b7" size={60} className="mt-3 mx-auto" />
      ) : (
        <div className="flex flex-col items-center mt-5">
          <p className="text-2xl font-bold">Appointments List</p>
          <div className="max-w-5xl mx-auto flex items-center justify-evenly flex-wrap mt-3">
            {appointments?.docs.map((doc) => (
              <AppointmentCard
                key={doc.id}
                id={doc.id}
                farmerName={doc.data().farmerName}
                address={doc.data().address}
                problem={doc.data().problem}
                time={doc.data().timestamp?.toDate().getTime()}
                empEmail={doc.data().empEmail}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAppointments;
