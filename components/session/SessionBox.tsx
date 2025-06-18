"use client";
import React, { useState } from "react";
import FormRegister from "./FormRegister";
import Login from "./Login";

export default function SessionBox() {
  const [activeTab, setActiveTab] = useState<string>("register");
  return (
    <div>
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("register")}
          className={`${
            activeTab === "register" ? "bg-purple-700 text-white font-bold" : ""
          } py-1 px-2 rounded-full text-sm text-white`}
        >
          Register
        </button>

        <button
          onClick={() => setActiveTab("login")}
          className={`${
            activeTab === "login" ? "bg-purple-700 text-white font-bold" : ""
          } py-1 px-2 rounded-full text-sm text-white`}
        >
          Login
        </button>
      </div>

      {activeTab === "register" && (
        <div>
          <h3 className="text-2xl font-bold">Register</h3>
          <p className="mb-8">
            Join now and connect with your favorite creators!
          </p>
          <FormRegister />
        </div>
      )}

      {activeTab === "login" && (
        <div>
          <h3 className="text-2xl font-bold">Login</h3>
          <p className="mb-8">
            Join now and connect with your favorite creators!
          </p>
          <Login userType="subscriber" />
        </div>
      )}
    </div>
  );
}
