import { Badge, Card, Text } from "@tremor/react";
import { deleteDoc, doc, query, updateDoc } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { db } from "../firebase";
import { useState } from "react";

function FarmerRequestCard({
  id,
  farmerAadhar,
  farmerAddress,
  farmerBirthDate,
  farmerEmail,
  farmerHarvests,
  farmerID,
  farmerMobile,
  farmerName,
  isFarmerVerified,
  requestTime,
}) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const approveFarmer = () => {
    const q = query(doc(db, `farmers/${farmerEmail}`));

    updateDoc(q, {
      isFarmerVerified: true,
    })
      .then(() => setShowSuccessModal(true))
      .catch((err) => alert(err.message));
  };

  const rejectFarmer = () => {
    const q = query(doc(db, `farmers/${farmerEmail}`));

    deleteDoc(q)
      .then(() => setShowRejectModal(true))
      .catch((err) => alert(err.message));
  };
  return (
    <div className="w-[100%]">
      <div className="w-[100%]">
        <Card
          decoration="top"
          decorationColor="red"
          className="!bg-white !max-w-sm"
        >
          <Badge className="!bg-green-400 !text-white">Reference: {id}</Badge>
          <Text>Farmer ID: {farmerID}</Text>
          <Text>Name: {farmerName}</Text>
          <Text>Mobile: {farmerMobile}</Text>
          <Text>Date of Birth: {farmerBirthDate}</Text>
          <Text>Address: {farmerAddress}</Text>
          <Text>Aadhaar: {farmerAadhar}</Text>
          <Text>
            Verified:{" "}
            <Badge
              className={
                isFarmerVerified
                  ? "!bg-green-200 !text-green-900"
                  : "!bg-red-300 !text-red-800"
              }
            >
              {isFarmerVerified ? "Yes" : "No"}
            </Badge>
          </Text>
          <Text>Request Time: {moment(requestTime).format("LT")}</Text>
          <div className="flex items-center justify-evenly flex-wrap mt-3">
            {farmerHarvests.map((harvest) => (
              <Badge className="!bg-gray-300 !text-black mr-3">
                {harvest.grain} : {harvest.category}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-around">
            <button
              onClick={approveFarmer}
              className="bg-green-400 rounded-lg text-sm font-bold p-3 hover:scale-110 transition-all duration-200 ease-out text-white mt-3"
            >
              Approve
            </button>
            <button
              onClick={rejectFarmer}
              className="bg-red-400 rounded-lg text-sm font-bold p-3 hover:scale-110 transition-all duration-200 ease-out text-white mt-3"
            >
              Reject
            </button>
          </div>
        </Card>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed top-24 mx-auto z-50">
          <Card
            decoration="top"
            decorationColor="green"
            className="!bg-white text-center"
          >
            <Text className="!text-3xl font-bold !text-green-500">
              Request Approved
            </Text>
            <Text className="mt-3">
              Farmer with reference {farmerEmail} has been approved successfully
            </Text>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-green-400 rounded-lg text-sm font-bold p-3 hover:scale-110 transition-all duration-200 ease-out text-white mt-3"
            >
              Close
            </button>
          </Card>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed top-24 mx-auto">
          <Card
            decoration="top"
            decorationColor="red"
            className="!bg-white text-center"
          >
            <Text className="!text-3xl font-bold !text-red-500">
              Request Rejected
            </Text>
            <Text className="mt-3">
              Farmer with reference {farmerEmail} has been rejected.
            </Text>
            <button
              onClick={() => setShowRejectModal(false)}
              className="bg-green-400 rounded-lg text-sm font-bold p-3 hover:scale-110 transition-all duration-200 ease-out text-white mt-3"
            >
              Close
            </button>
          </Card>
        </div>
      )}
    </div>
  );
}

export default FarmerRequestCard;
