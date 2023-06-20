import React from "react";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRef } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function SellProducts() {
  const [selectedFile, setSelectedFile] = useState("");
  const filePickerRef = useRef(null);
  const [farmerName, setFarmerName] = useState("");
  const [productName, setProductName] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [harvestLocation, setHarvestLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [farmerEmail, setFarmerEmail] = useState("");

  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    fullname: yup.string().required(),
    productname: yup.string().required(),
    harvestdate: yup.date().required(),
    expirydate: yup.number().required(),
    harvestlocation: yup.number().required(),
    price: yup.number().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // AddProduct();
    console.log(data);
  };

  const addImageToProfile = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const AddProduct = async (e) => {
    e.preventDefault();
    const docRef = query(doc(db, `farmers/${user?.email}`));

    const docSnap = await getDoc(docRef);

    if (docSnap.data().farmerEmail === farmerEmail) {
      const prodImageRef = ref(
        storage,
        `products/${farmerName}_${productName}.jpg`
      );

      await uploadString(prodImageRef, selectedFile, "data_url")
        .then(() => {
          getDownloadURL(prodImageRef)
            .then((url) => {
              const q = query(collection(db, "products"));
              addDoc(q, {
                farmerName: farmerName,
                farmerEmail: farmerEmail,
                productName: productName,
                productCategory: productCategory,
                harvestDate: harvestDate,
                expiryDate: expiryDate,
                harvestLocation: harvestLocation,
                quantity: quantity,
                price: price,
                stock: quantity,
                prodImage: url,
              })
                .then(() => alert("Product Added!!!!"))
                .catch((err) => alert(err.message));
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => alert(err.message));
    } else {
      alert("Farmer Email did not match!!!");
    }

    setFarmerName("");
    setFarmerEmail("");
    setProductName("");
    setProductCategory("");
    setHarvestDate("");
    setExpiryDate("");
    setHarvestLocation("");
    setQuantity("");
    setPrice("");
    setSelectedFile("");
  };

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <Header />
      <img
        src="https://kisansuvidha.gov.in/assets/images/kisan-logo.png"
        alt="banner"
        className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] mt-4"
      />
      <form
        className="flex flex-col space-y-3 w-[400px]"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mt-3 mx-auto">Sell your Products</h1>

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
          placeholder="Farmer Name"
          className="inputStyle"
          value={farmerName}
          onChange={(e) => setFarmerName(e.target.value)}
          // {...register("fullname")}
        />
        <input
          type="email"
          placeholder="Farmer Email"
          className="inputStyle"
          value={farmerEmail}
          onChange={(e) => setFarmerEmail(e.target.value)}
          // {...register("fullname")}
        />
        <input
          type="text"
          placeholder="Product Name"
          className="inputStyle"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          // {...register("productname")}
        />

        <input
          type="text"
          placeholder="Product Category"
          className="inputStyle"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          // {...register("productname")}
        />

        <input
          type="date"
          placeholder="Harvest Date"
          className="inputStyle"
          onChange={(e) => setHarvestDate(e.target.value)}
          // {...register("harvestdate")}
        />
        <input
          type="date"
          placeholder="Expiry Date"
          className="inputStyle"
          onChange={(e) => setExpiryDate(e.target.value)}
          // {...register("expirydate")}
        />
        <input
          type="text"
          placeholder="Harvest Location"
          className="inputStyle"
          value={harvestLocation}
          onChange={(e) => setHarvestLocation(e.target.value)}
          // {...register("harvestlocation")}
        />

        <input
          type="text"
          placeholder="Quantity"
          className="inputStyle"
          onChange={(e) => setQuantity(e.target.value)}
          // {...register("quantity")}
        />
        <input
          type="text"
          placeholder="Price"
          className="inputStyle"
          onChange={(e) => setPrice(e.target.value)}
          // {...register("price")}
        />
        <input
          onClick={AddProduct}
          type="submit"
          className="bg-green-400 p-3 text-sm font-bold rounded-lg hover:scale-110 transition-all duration-200 ease-out cursor-pointer text-white"
        />
      </form>
    </div>
  );
}

export default SellProducts;
