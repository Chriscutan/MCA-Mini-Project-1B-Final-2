import React from "react";
import Header from "../components/Header";
import EmpCard from "../components/EmpCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { BounceLoader } from "react-spinners";

function BookVets() {
  const q = query(
    collection(db, "employees"),
    where("designation", "==", "Vet")
  );
  const [vets, loading] = useCollection(q);
  return (
    <div className="bg-gray-100">
      <Header />

      {loading ? (
        <BounceLoader color="#36d7b7" size={60} className="mt-3 mx-auto" />
      ) : (
        <div className="max-w-5xl flex items-center justify-evenly flex-wrap mt-5 mx-auto">
          {vets?.docs.map((vet) => (
            <EmpCard
              key={vet.id}
              id={vet.id}
              profilePic={vet.data().profilePic}
              name={vet.data().name}
              designation={vet.data().designation}
              experience={vet.data().experience}
              status={vet.data().status}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookVets;
