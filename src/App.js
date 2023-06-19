import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterAsFarmer from "./pages/RegisterAsFarmer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";
import BookVets from "./pages/BookVets";
import SellProducts from "./pages/SellProducts";
import BookEnggs from "./pages/BookEnggs";
import BuyProducts from "./pages/BuyProducts";
import News from "./pages/News";
import Weather from "./pages/Weather";
import AdminHome from "./pages/AdminHome";
import Employees from "./pages/Employees";
import MakeAppointment from "./pages/MakeAppointment";
import AdminAppointments from "./pages/AdminAppointments";
import CartProducts from "./pages/CartProducts";
import Checkout from "./pages/Checkout";
import FarmerRequests from "./pages/FarmerRequests";
import AdminOrders from "./pages/AdminOrders";
import MyOrder from "./pages/MyOrder";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/register" element={<RegisterAsFarmer />} />
            <Route path="/bookvets" element={<BookVets />} />
            <Route path="/bookenggs" element={<BookEnggs />} />
            <Route path="/sellproducts" element={<SellProducts />} />
            <Route path="/buyproducts" element={<BuyProducts />} />
            <Route path="/cartProducts" element={<CartProducts />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/myorders" element={<MyOrder />} />
            <Route path="/news" element={<News />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/admin/employees" element={<Employees />} />
            <Route path="/makeAppointment" element={<MakeAppointment />} />
            <Route path="/admin/appointments" element={<AdminAppointments />} />
            <Route path="/admin/farmers" element={<FarmerRequests />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
