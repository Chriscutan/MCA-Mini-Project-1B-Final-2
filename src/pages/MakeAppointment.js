import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectEmp } from "../features/EmpSlice";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { Card, Text } from "@tremor/react";

function MakeAppointment() {
  const [empInfo, setEmpInfo] = useState([]);
  const selectedEmp = useSelector(selectEmp);
  const [showModal, setShowModal] = useState(false);

  const [farmerName, setFarmerName] = useState("");
  const [address, setAddress] = useState("");
  const [problem, setProblem] = useState("");

  const currentDate =
    new Date().getDate() +
    "-" +
    new Date().getMonth() +
    "-" +
    new Date().getFullYear();

  const appointmentDate =
    new Date().getDate() +
    1 +
    "-" +
    new Date().getMonth() +
    "-" +
    new Date().getFullYear();

  useEffect(() => {
    const fetchDoc = async () => {
      const q = query(doc(db, `employees/${selectedEmp[0].id}`));
      const docSnap = await getDoc(q);
      if (docSnap.exists()) {
        setEmpInfo(docSnap.data());
      }
    };

    return fetchDoc;
  }, []);

  const confirmAppointment = (e) => {
    e.preventDefault();
    addDoc(collection(db, "appointments"), {
      farmerName: farmerName,
      empEmail: selectedEmp[0]?.id,
      address: address,
      problem: problem,
      timestamp: serverTimestamp(),
    }).catch((err) => alert(err.message));

    setShowModal(true);

    setFarmerName("");
    setAddress("");
    setProblem("");
  };

  return (
    <div className="absolute bg-gray-100">
      <Header />

      <div className="max-w-3xl mx-auto mt-5 text-center">
        <p className="text-3xl font-bold text-center">Make Appointment</p>

        {/* Selected Vet Info */}
        <div className="flex flex-col items-center mx-auto mt-5 border border-gray-300 w-fit p-3 rounded-lg bg-gray-100">
          <img
            src={empInfo?.profilePic}
            alt="pic"
            height={200}
            width={200}
            className="object-contain rounded-lg mb-3"
          />
          <p className="text-lg font-semibold">Name: {empInfo?.name}</p>
          <p className="text-lg font-semibold">
            Designation: {empInfo?.designation}
          </p>
          <p className="text-lg font-semibold">
            Speciality: {empInfo?.speciality}
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col space-y-3 w-[400px] mx-auto mt-3">
          <h1 className="text-2xl font-bold mt-3 mx-auto">
            Provide Problem Description
          </h1>

          <input
            type="text"
            placeholder="Farmer Name"
            className="inputStyle"
            value={farmerName}
            onChange={(e) => setFarmerName(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Address"
            className="inputStyle"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            type="date"
            placeholder="Problem Description"
            className="inputStyle"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
          <input
            onClick={confirmAppointment}
            type="submit"
            className="bg-green-400 p-3 text-sm font-bold rounded-lg hover:scale-110 transition-all duration-200 ease-out cursor-pointer text-white"
          />
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <Card
          decoration="top"
          decorationColor="green"
          className="!bg-white max-w-2xl !text-center h-fit rounded-lg p-3 space-y-2 shadow-md absolute z-50 mx-auto "
        >
          <Text className="!text-2xl font-bold !text-green-400 text-center">
            Appointment Successful!!!
          </Text>
          <Text className="text-xl font-semibold mt-2">
            Your appointment with {selectedEmp[0]?.name} is successful!!!
          </Text>
          <Text className="text-lg font-bold mt-2">
            Booking Date: {currentDate}
          </Text>
          <Text className="text-lg font-bold mt-2">
            Appointment Date: {appointmentDate}
          </Text>
          <Text className="text-lg font-bold mt-2">
            Contact: {empInfo?.mobile}
          </Text>
          <button
            onClick={() => setShowModal(false)}
            className="bg-green-400 px-8 text-white py-4 text-sm font-bold rounded-lg hover:scale-110 transition-all duration-200 ease-out mt-3"
          >
            Close
          </button>
        </Card>
      )}
    </div>
  );
}

export default MakeAppointment;
