import { BadgeDelta, Card, Metric, Text } from "@tremor/react";
import EmployeeEditCard from "./EmployeeEditCard";
import { deleteDoc, doc, query } from "firebase/firestore";
import { db } from "../firebase";

function EmployeeCard({
  id,
  name,
  email,
  mobile,
  designation,
  experience,
  status,
  profilePic,
  speciality,
}) {
  const deleteEmp = () => {
    const q = query(doc(db, `employees/${id}`));

    deleteDoc(q)
      .then(() => {
        document.getElementById("deleteModal").style.display = "block";
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="">
      <Card
        decoration="top"
        decorationColor="indigo"
        className="!bg-white space-y-2 w-fit max-h-fit mt-4 hover:scale-105 transition-all duration-200 ease-out"
      >
        <img
          src={profilePic}
          alt="pic"
          height={150}
          width={150}
          className="rounded-lg object-contain"
        />
        <Text>Name: {name}</Text>
        <Text>Email: {email}</Text>
        <Text>Mobile: {mobile}</Text>
        <Text>Designation: {designation}</Text>
        <BadgeDelta
          size="xl"
          deltaType={status ? "moderateIncrease" : "moderateDecrease"}
        >
          {status ? "Avaiable" : "Unavailable"}
        </BadgeDelta>
        <Metric color="black" className="!text-sm">
          Experience: {experience} years
        </Metric>
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              document.getElementById("editModal").style.display = "block";
            }}
            className="bg-indigo-400 text-sm font-bold px-4 py-2 mt-2 rounded-lg text-white hover:scale-110 transition-all duration-200 ease-out"
          >
            Edit
          </button>
          <button
            onClick={deleteEmp}
            className="bg-red-400 text-sm font-bold px-4 py-2 mt-2 rounded-lg text-white hover:scale-110 transition-all duration-200 ease-out"
          >
            Delete
          </button>
        </div>
      </Card>

      {/* Show Edit Modal */}
      <div id="editModal" className="hidden">
        <EmployeeEditCard
          empID={id}
          empName={name}
          empEmail={email}
          empMobile={mobile}
          empDesignation={designation}
          empExperience={experience}
          empStatus={status}
          empProfilePic={profilePic}
          empSpeciality={speciality}
        />
      </div>

      {/* Show Delete Modal */}
      <div id="deleteModal" className="hidden fixed z-50 top-28 mx-auto">
        <Card
          decoration="top"
          decorationColor="red"
          className="!bg-white text-center"
        >
          <Text className="!text-3xl font-bold !text-red-400 mt-3">
            Deleted Successfully!!!
          </Text>
          <Text className="mt-3">
            Employee record with reference {id} has been deleted.
          </Text>
          <button
            onClick={() =>
              (document.getElementById("deleteModal").style.display = "none")
            }
            className="bg-red-400 text-sm font-bold px-4 py-2 mt-2 rounded-lg text-white hover:scale-110 transition-all duration-200 ease-out mr-3"
          >
            Close
          </button>
        </Card>
      </div>
    </div>
  );
}

export default EmployeeCard;
