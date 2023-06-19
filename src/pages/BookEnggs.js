import React from "react";
import Header from "../components/Header";
import EmpCard from "../components/EmpCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { BounceLoader } from "react-spinners";

function BookEnggs() {
  const q = query(
    collection(db, "employees"),
    where("designation", "==", "Engineer")
  );
  const [enggs, loading] = useCollection(q);
  return (
    <div className="bg-gray-100">
      <Header />

      {loading ? (
        <BounceLoader color="#36d7b7" size={60} className="mt-3 mx-auto" />
      ) : (
        <div className="max-w-5xl flex items-center justify-evenly flex-wrap mt-5 mx-auto">
          {enggs?.docs.map((engg) => (
            <EmpCard
              key={engg.id}
              id={engg.id}
              name={engg.data().name}
              designation={engg.data().designation}
              experience={engg.data().experience}
              status={engg.data().status}
              profilePic={engg.data().profilePic}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookEnggs;
