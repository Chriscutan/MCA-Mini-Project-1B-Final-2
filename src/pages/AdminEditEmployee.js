import React from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { doc, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectEmp } from "../features/AdminEmp";
import { useNavigate } from "react-router-dom";

function AdminEditEmployee() {
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const selectedEmp = useSelector(selectEmp);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("");
  const [speciality, setSpeciality] = useState("");

  const addImageToProfile = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const updateEmpProfile = () => {
    const q = query(doc(db, `employees/${selectedEmp[0]?.id}`));
    updateDoc(q, {
      name: name !== "" ? name : selectedEmp[0]?.name,
      email: email !== "" ? email : selectedEmp[0]?.email,
      mobile: mobile !== "" ? mobile : selectedEmp[0]?.mobile,
      designation:
        designation !== "" ? designation : selectedEmp[0]?.designation,
      experience: experience !== "" ? experience : selectedEmp[0]?.experience,
      speciality: speciality !== "" ? speciality : selectedEmp[0]?.speciality,
      status: status === "Available" ? true : false,
      profilePic: selectedFile ? selectedFile : selectedEmp[0]?.profilePic,
    })
      .then(() => {
        navigate("/admin/employee");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div
      id="editCard"
      className="max-w-sm mx-auto mt-10 flex flex-col items-center space-y-2 border border-gray-300 rounded-lg bg-gray-100 p-4"
    >
      <h1 className="text-3xl font-bold">Edit Employee</h1>
      {selectedFile ? (
        <img
          src={selectedFile}
          alt="file"
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-[100%] p-2 outline-none rounded-lg"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-[100%] p-2 outline-none rounded-lg"
      />
      <input
        type="text"
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-[100%] p-2 outline-none rounded-lg"
      />
      <input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        className="w-[100%] p-2 outline-none rounded-lg"
      />
      <input
        type="text"
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="w-[100%] p-2 outline-none rounded-lg"
      />
      <input
        type="text"
        placeholder="Speciality"
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
        className="w-[100%] p-2 outline-none rounded-lg"
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-[100%] p-2 outline-none rounded-lg"
      />
      <div className="flex items-center">
        <button
          onClick={updateEmpProfile}
          className="bg-green-400 text-sm font-bold px-4 py-2 mt-2 rounded-lg text-white hover:scale-110 transition-all duration-200 ease-out mr-3"
        >
          Edit Employee
        </button>
      </div>
    </div>
  );
}

export default AdminEditEmployee;
