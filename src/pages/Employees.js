import React from "react";
import AdminHeader from "../components/AdminHeader";
import { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../firebase";
import { collection, doc, query, setDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import EmployeeCard from "../components/EmployeeCard";
import { BounceLoader } from "react-spinners";

function Employees() {
  const [showEmpModal, setShowEmpModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState(0);
  const [status, setStatus] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);

  const addImageToProfile = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const AddEmployee = async () => {
    let empImagesRef;
    if ((designation === "vet") | (designation === "Vet")) {
      empImagesRef = ref(storage, `employees/vets/${name}.jpg`);
    } else {
      empImagesRef = ref(storage, `employees/engineers/${name}.jpg`);
    }

    await uploadString(empImagesRef, selectedFile, "data_url")
      .then(() => {
        getDownloadURL(empImagesRef)
          .then((url) => {
            const q = query(doc(db, `employees/${email}`));
            setDoc(q, {
              name: name,
              email: email,
              mobile: mobile,
              designation: designation,
              experience: experience,
              status: status === "Available" ? true : false,
              speciality: speciality,
              profilePic: url,
            }).catch((err) => alert(err.message));
          })
          .catch((err) => alert(err.message));
      })
      .catch((err) => alert(err.message));

    setShowEmpModal(false);
    setName("");
    setEmail("");
    setMobile("");
    setExperience(0);
    setDesignation("");
    setSelectedFile(null);
    setSpeciality("");
    setStatus("");
  };

  const [employees, loading] = useCollection(collection(db, "employees"));
  return (
    <div className="w-screen">
      <AdminHeader />

      {loading ? (
        <BounceLoader color="#36d7b7" size={60} className="mt-3 mx-auto" />
      ) : (
        <div className="max-w-6xl h-screen mx-auto">
          <div className="flex items-center justify-between mt-3">
            <p className="text-3xl font-bold">Employees List</p>
            <button
              onClick={() => setShowEmpModal(true)}
              className="bg-green-400 p-3 text-sm font-bold rounded-lg text-white hover:scale-110 transition-all duration-200 ease-out"
            >
              Add Employee
            </button>
          </div>

          {/* Modal */}
          {showEmpModal && (
            <div className="flex flex-col max-w-[350px] bg-gray-100 h-fit rounded-lg p-3 space-y-2 border border-gray-300 shadow-md relative z-50 mx-auto top-0">
              <button
                onClick={() => setShowEmpModal(false)}
                className="bg-green-400 rounded-full h-7 w-7 text-sm font-bold text-white absolute right-2 top-1 hover:scale-110 transition-all duration-200 ease-out"
              >
                X
              </button>

              {selectedFile ? (
                <img
                  src={selectedFile}
                  alt=""
                  className="rounded-lg mx-auto object-contain"
                  height={200}
                  width={200}
                  onClick={() => setSelectedFile(null)}
                />
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => filePickerRef.current.click()}
                >
                  <CameraIcon className="h-10 w-10 text-gray-500 mx-auto" />
                  <input
                    type="file"
                    ref={filePickerRef}
                    hidden
                    onChange={addImageToProfile}
                  />
                </div>
              )}

              <input
                type="text"
                placeholder="Name"
                className="p-2 rounded-lg outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Designation"
                className="p-2 rounded-lg outline-none"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
              <input
                type="number"
                placeholder="Experience"
                className="p-2 rounded-lg outline-none"
                onChange={(e) => setExperience(e.target.value)}
              />
              <input
                type="text"
                placeholder="Speciality"
                className="p-2 rounded-lg outline-none"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              />
              <input
                type="text"
                placeholder="Status"
                className="p-2 rounded-lg outline-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />

              <input
                type="text"
                placeholder="Email"
                className="p-2 rounded-lg outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                placeholder="Mobile"
                className="p-2 rounded-lg outline-none"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <button
                onClick={AddEmployee}
                className="bg-green-400 rounded-lg text-sm font-bold text-white p-3 hover:scale-105 transition-all duration-200 ease-out mt-2"
              >
                Add Employee
              </button>
            </div>
          )}

          {/* Employee Details */}
          <div className="flex items-center justify-around flex-wrap mt-5">
            {employees?.docs.map((doc) => (
              <EmployeeCard
                key={doc.id}
                id={doc.id}
                name={doc.data().name}
                email={doc.data().email}
                mobile={doc.data().mobile}
                status={doc.data().status}
                experience={doc.data().experience}
                designation={doc.data().designation}
                profilePic={doc.data().profilePic}
                speciality={doc.data().speciality}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;
