import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const [showMenu, setShowMenu] = useState(true);

  const [user] = useAuthState(auth);
  return (
    <>
      <div className="hidden sm:bg-green-400 sm:w-screen sm:flex sm:items-center sm:justify-between sm:p-3 sm:sticky sm:top-0 sm:z-10">
        {/* Left */}
        <div className="space-x-4">
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex cursor-pointer sm:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <div className="hidden sm:inline-flex space-x-4">
            <Link to="/" className="home_link">
              Home
            </Link>
            <Link to="/register" className="home_link">
              Register as Farmer
            </Link>
            <Link to="/bookvets" className="home_link">
              Book Vet
            </Link>
            <Link to="/bookenggs" className="home_link">
              Book Engineer
            </Link>
            <Link to="/sellproducts" className="home_link">
              Sell Products
            </Link>
            <Link to="/buyproducts" className="home_link">
              Buy Products
            </Link>

            <Link to="/weather" className="home_link">
              Weather
            </Link>
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center">
          <Link to="myorders" className="home_link mr-10">
            My Orders
          </Link>
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
              onClick={() => auth.signOut()}
            >
              {user ? `Welcome back, ${user.displayName}` : "Login"}
            </p>
          </div>
        </div>
      </div>
      <div className="z-10 h-screen w-[40%] bg-green-400 flex flex-col justify-between sm:hidden">
        {/* top */}
        <div className="flex flex-col space-y-4 p-3">
          <div onClick={() => setShowMenu(!showMenu)} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <Link to="/" className="home_link">
            Home
          </Link>
          <Link to="/register" className="home_link">
            Register as Farmer
          </Link>
          <Link to="/" className="home_link">
            Book Vet
          </Link>
          <Link to="/" className="home_link">
            Book Engineer
          </Link>
          <Link to="/" className="home_link">
            Sell Products
          </Link>
          <Link to="/" className="home_link">
            Buy Products
          </Link>
          <Link to="/" className="home_link">
            News
          </Link>
        </div>
        {/* bottom */}
        <div className="flex items-center p-3">
          <img
            src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
            alt="profile"
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
          <p className="flex-1 ml-2 text-sm">User Email</p>
        </div>
      </div>
    </>
  );
}

export default Header;
