import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useState } from "react";

function AdminHeader() {
  const [showMenu, setShowMenu] = useState(true);

  const [user] = useAuthState(auth);
  return (
    <div className="hidden sm:bg-green-400 sm:w-screen sm:flex sm:items-center sm:justify-between sm:p-3 sm:sticky sm:top-0 sm:z-10">
      {/* Left */}
      <div className="space-x-4">
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="inline-flex cursor-pointer sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="hidden sm:inline-flex space-x-4">
          <Link to="/admin" className="home_link">
            Home
          </Link>
          <Link to="/admin/farmers" className="home_link">
            Farmer Requests
          </Link>
          <Link to="/admin/appointments" className="home_link">
            Appointments
          </Link>
          <Link to="/admin/orders" className="home_link">
            Orders
          </Link>
          <Link to="/admin/employees" className="home_link">
            Employees
          </Link>
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-col items-center">
        <img
          onClick={() => auth.signOut()}
          src={
            user
              ? user.photoURL
              : "https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
          }
          alt="profile"
          className="h-6 w-6 sm:h-10 sm:w-10 cursor-pointer rounded-full"
        />
        <p
          className="text-sm font-semibold cursor-pointer"
          onClick={() => auth.signOut()}>
          {user ? `Welcome back, ${user.displayName}` : "Login"}
        </p>
      </div>
    </div>
  );
}

export default AdminHeader;
