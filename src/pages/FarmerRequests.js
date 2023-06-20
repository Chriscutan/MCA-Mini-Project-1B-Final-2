import React from "react";
import AdminHeader from "../components/AdminHeader";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import FarmerRequestCard from "../components/FarmerRequestCard";
import { BounceLoader } from "react-spinners";

function FarmerRequests() {
  const [farmers, loading] = useCollection(collection(db, "farmers"));
  return (
    <div className="bg-gray-100 h-screen">
      <AdminHeader />

      <div className="max-w-7xl mx-auto flex items-center justify-evenly flex-wrap">
        {loading ? (
          <BounceLoader color="#36d7b7" size={60} className="mt-3 mx-auto" />
        ) : (
          <div className="p-5">
            {farmers?.docs.map((doc) => (
              <FarmerRequestCard
                key={doc.id}
                id={doc.id}
                farmerName={doc.data().farmerName}
                farmerMobile={doc.data().farmerMobile}
                farmerEmail={doc.data().farmerEmail}
                farmerID={doc.data().farmerID}
                farmerAadhar={doc.data().farmerAadhar}
                farmerAddress={doc.data().farmerAadhar}
                farmerBirthDate={doc.data().farmerBirthDate}
                isFarmerVerified={doc.data().isFarmerVerified}
                requestTime={doc.data().timestamp?.toDate().getTime()}
                farmerHarvests={doc.data().farmerHarvests}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FarmerRequests;
