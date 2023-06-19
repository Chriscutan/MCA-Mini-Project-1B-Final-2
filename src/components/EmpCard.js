import React from "react";
import { useDispatch } from "react-redux";
import { addEmp } from "../features/EmpSlice";
import { useNavigate } from "react-router-dom";

function EmpCard({ id, profilePic, name, designation, experience, status }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectVetAndNavigate = () => {
    dispatch(addEmp({ id, name, designation }));
    navigate("/makeAppointment");
  };
  return (
    <div className="max-w-[230px] h-fit p-3 rounded-md border border-gray-300 bg-gray-100 mt-5 mr-2 hover:scale-110 transition-all duration-200 ease-out">
      <div>
        <img
          src={profilePic}
          alt="pic"
          height={200}
          width={200}
          className="object-contain rounded-full"
        />
      </div>
      <div className="space-y-2 mt-3">
        <p className="text-sm">
          Name: <span className="text-sm">{name}</span>
        </p>
        <p className="text-sm">
          Designation: <span className="text-sm">{designation}</span>
        </p>
        <p className="text-sm">
          Experience: <span className="text-sm">{experience}</span>
        </p>
        <p className="text-sm">
          Status:{" "}
          <span className="text-sm">{status ? "Avaiable" : "Unavailable"}</span>
        </p>
      </div>

      <button
        onClick={selectVetAndNavigate}
        disabled={!status}
        className={
          !status
            ? "bg-gray-400 w-[100%] font-semibold mt-3 text-sm p-2 rounded-lg"
            : "bg-green-400 w-[100%] font-semibold mt-3 text-sm p-2 rounded-lg hover:scale-105 transition-all duration-200 ease-out"
        }>
        Book Vet
      </button>
    </div>
  );
}

export default EmpCard;
