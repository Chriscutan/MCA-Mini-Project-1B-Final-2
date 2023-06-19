import React from "react";
import Header from "../components/Header";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ChatBotUI from "../components/ChatBotUI";

function Home() {
  const [showChatBot, setShowChatBot] = useState(false);
  return (
    <div className="flex h-screen items-center sm:w-screen sm:h-screen sm:flex sm:flex-col bg-gray-100">
      <Header />
      {/* banner */}
      <div className="flex flex-col items-center justify-center mx-auto">
        <div className="flex flex-col items-center mt-5 sm:flex sm:flex-row sm:items-center sm:space-x-6 sm:justify-center">
          <img
            src="https://kisansuvidha.gov.in/assets/images/kisan-logo.png"
            alt="banner"
            className="h-[200px] w-[200px] sm:h-[250px] sm:w-[250px]"
          />
          {/* TODO:Add a motto */}
          <p className="text-xl font-bold decoration-orange-500 decoration-2 underline">
            Where farmers experince benefits!!!
          </p>
        </div>

        {/* About Us */}
        <div className="flex flex-col items-center mt-8 max-w-xl ">
          <p className="text-sm font-bold sm:text-xl sm:font-bold">About Us</p>
          <div className="flex flex-col items-center mt-4 sm:flex sm:flex-row sm:space-x-10">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/India_Farming.jpg"
              alt="banner2"
              className="h-[200px] w-[200px] rounded-lg sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px]"
            />
            {/* TODO:Add a about us */}
            <p className="text-xl font-semibold sm:text-base">
              This is an all in one stop for farmers. We provide services
              through which farmers will be able to sell their products, book
              appoinment with vets and engineers. Farmers can use chatbot to
              clarify any queries.
            </p>
          </div>
        </div>
      </div>
      {/* Chatbot */}
      <div>
        <button
          onClick={() => setShowChatBot(!showChatBot)}
          className="fixed bottom-5 right-10"
        >
          <ChatBubbleLeftEllipsisIcon className="h-14 w-14 text-green-500" />
        </button>

        {showChatBot && (
          <div className="fixed bottom-10 right-28">
            <ChatBotUI />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
