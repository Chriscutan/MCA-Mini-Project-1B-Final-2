import React from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { doc, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function EmployeeEditCard({
  empName,
  empEmail,
  empMobile,
  empDesignation,
  empExperience,
  empStatus,
  empID,
  empSpeciality,
  empProfilePic,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);

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
    const q = query(doc(db, `employees/${empID}`));

    updateDoc(q, {
      name: name ? name : empName,
      email: email ? email : empEmail,
      mobile: mobile ? mobile : empMobile,
      designation: designation ? designation : empDesignation,
      experience: experience ? experience : empExperience,
      speciality: speciality ? speciality : empSpeciality,
      status: status ? true : false,
      profilePic: selectedFile ? selectedFile : empProfilePic,
    }).then(() => {
      document.getElementById("editCard").style.display = "none";
    });
  };

  return (
    <div
      id="editCard"
      className="max-w-lg flex flex-col items-center space-y-2 border border-gray-300 rounded-lg bg-gray-100 p-4"
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

export default EmployeeEditCard;
