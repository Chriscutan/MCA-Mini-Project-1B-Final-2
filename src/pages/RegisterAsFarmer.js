import React from "react";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import Select from "react-select";
import { useState } from "react";
import { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddedProductCard from "../components/AddedProductCard";
import { doc, query, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Card, Text } from "@tremor/react";
import { useAuthState } from "react-firebase-hooks/auth";

function RegisterAsFarmer() {
  const [selectedGrain, setSelectedGrain] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  const [showVerifyModal, setShowverifyModal] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [aadhar, setAadhar] = useState(0);
  const [address, setAddress] = useState("");
  const [farmerID, setFarmerID] = useState("");

  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    fullname: yup.string().required(),
    mobileno: yup.string().required(),
    emailid: yup.string().email().required(),
    dateofbirth: yup.number().required(),
    adharno: yup.number().required(),
    address: yup.string().required(),
    farmid: yup.number().required(),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const AddFarmerForVerification = (e) => {
    e.preventDefault();

    const q = query(doc(db, `farmers/${user?.email}`));

    setDoc(q, {
      farmerName: name,
      farmerEmail: user?.email,
      farmerMobile: mobile,
      farmerBirthDate: birthDate,
      farmerAadhar: aadhar,
      farmerAddress: address,
      farmerID: farmerID,
      farmerHarvests: addedProducts,
      isFarmerVerified: false,
      timestamp: serverTimestamp(),
    })
      .then(() => setShowverifyModal(true))
      .catch((err) => alert(err.message));
  };

  const grains = [
    { label: "Rice", value: "Rice" },
    { label: "Wheat", value: "Wheat" },
    { label: "Jowar", value: "Jowar" },
  ];

  const riceCategory = [
    { label: "Kalimuch", value: "Kalimuch" },
    { label: "Brown Rice", value: "Brown Rice" },
    { label: "Tibar Basmati", value: "Tibar Basmati" },
    { label: "Dibar Basmati", value: "Dihar Basmati" },
  ];

  const jowarCategory = [
    { label: "Bajara", value: "Bajara" },
    { label: "Piwali", value: "Piwali" },
    { label: "Cholam", value: "Cholam" },
  ];

  const wheatCategory = [
    { label: "Spelt", value: "Spelt" },
    { label: "White Wheat", value: "White Wheat" },
    { label: "Spring Wheat", value: "Spring Wheat" },
  ];

  useEffect(() => {
    if (selectedGrain === "Rice") {
      setCategory(riceCategory);
    } else if (selectedGrain === "Wheat") {
      setCategory(wheatCategory);
    } else if (selectedGrain === "Jowar") {
      setCategory(jowarCategory);
    }
  }, [selectedGrain]);

  const addProduct = (e) => {
    e.preventDefault();
    setAddedProducts([
      ...addedProducts,
      { grain: selectedGrain, category: selectedCategory },
    ]);
    setShowModel(false);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 h-screen">
      <Header />
      <img
        src="https://kisansuvidha.gov.in/assets/images/kisan-logo.png"
        alt="banner"
        className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] mt-4"
      />
      <form
        className="flex flex-col w-[400px] space-y-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold text-center">Register As Farmer</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="inputStyle"
          value={name}
          onChange={(e) => setName(e.target.value)}
          // {...register("fullname")}
        />
        <input
          type="text"
          placeholder="Mobile No."
          className="inputStyle"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          // {...register("mobileno")}
        />

        <input
          type="date"
          placeholder="Date of Birth"
          className="inputStyle"
          onChange={(e) => setBirthDate(e.target.value)}
          // {...register("dateofbirth")}
        />
        <input
          type="text"
          placeholder="Aadhaar No."
          className="inputStyle"
          onChange={(e) => setAadhar(e.target.value)}
          // {...register("adharno")}
        />
        <textarea
          type="text"
          placeholder="Address"
          className="inputStyle"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          // {...register("address")}
        />
        <input
          type="text"
          placeholder="Farmer Id"
          className="inputStyle"
          value={farmerID}
          onChange={(e) => setFarmerID(e.target.value)}
          // {...register("farmerid")}
        />
        <div className="flex space-x-4 items-center">
          <h1>Your Harvests:</h1>
          <button
            className="bg-green-400 p-2 rounded-full hover:scale-125"
            onClick={(e) => {
              e.preventDefault();
              setShowModel(true);
            }}
          >
            <PlusIcon className="h-3 w-3 " />
          </button>

          <div className="fixed top-60 right-80 flex-col items-center space-y-3">
            <h1 className="text-2xl font-bold">Your Harvests</h1>
            {addedProducts?.map((product) => (
              <AddedProductCard
                grain={product.grain}
                category={product.category}
              />
            ))}
          </div>
        </div>
        {showModel && (
          <div>
            <p>Select the grains you harvest</p>
            <Select
              options={grains}
              onChange={(val) => setSelectedGrain(val.value)}
            />
            <p>Select the category of {selectedGrain}</p>
            <Select
              options={category}
              onChange={(val) => setSelectedCategory(val.value)}
            />
            <button
              className="bg-green-400 p-3 hover:scale-125 mt-3 rounded-lg transition-all duration-200 ease-out"
              onClick={addProduct}
            >
              Add Product
            </button>
          </div>
        )}

        <button
          onClick={AddFarmerForVerification}
          className="bg-green-400 p-3 hover:scale-110 mt-3 rounded-lg transition-all duration-200 ease-out text-white font-bold"
        >
          Register
        </button>
      </form>

      {/* Verify Modal */}
      {showVerifyModal && (
        <div className="flex flex-col items-center max-w-md fixed top-24 mx-auto z-50">
          <Card
            decoration="top"
            decorationColor="blue"
            className="!bg-white flex flex-col items-center"
          >
            <Text className="text-3xl font-extrabold !text-black ">
              Registeration Confirmation
            </Text>
            <Text className="mt-3">
              Your registeration has been acknowledged successfully, and is sent
              for verification. Once verified you will be able to use the
              application.
            </Text>
            <button
              onClick={() => setShowverifyModal(false)}
              className="bg-blue-400 rounded-lg text-white text-sm font-bold p-3 hover:scale-110 transition-all duration-200 ease-out mt-3"
            >
              Close
            </button>
          </Card>
        </div>
      )}
    </div>
  );
}

export default RegisterAsFarmer;
