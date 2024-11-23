import axios from "axios";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function AddUserForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const body = { userName, email, password, phoneNumber, address };
      const { data } = await axios.post("https://h8-phase2-gc.vercel.app/apis/add-user", body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/");
      Toastify({
        text: `Succeed add User`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#34D399",
          color: "#000000",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Add User</title>
      <main>
        {/* Centered Container */}
        <div className="flex w-screen h-screen justify-center items-center">
          <div className="bg-white w-2/3 rounded-lg p-6 shadow-lg">
            {/* Form Header */}
            <div className="flex w-full justify-center items-center mb-4">
              <h1 className="font-serif text-black text-4xl">Add User Form</h1>
            </div>
            <p className="font-serif text-center text-lg mb-6">Fill in the details to register a new user.</p>
            <hr className="w-5/6 h-px bg-gray-800 border-0 mb-6 mx-auto" />
            {/* User Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="grid grid-cols-2 gap-6 mb-4">
                {/* Username */}
                <div>
                  <label className="font-serif text-lg block mb-1" htmlFor="username">
                    Username
                  </label>
                  <input type="text" id="username" className="border-black border-2 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Enter username" onChange={(e) => setUserName(e.target.value)} />
                </div>
                {/* Email */}
                <div>
                  <label className="font-serif text-lg block mb-1" htmlFor="email">
                    Email
                  </label>
                  <input type="email" id="email" className="border-black border-2 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                {/* Password */}
                <div>
                  <label className="font-serif text-lg block mb-1" htmlFor="password">
                    Password
                  </label>
                  <input type="password" id="password" className="border-black border-2 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                {/* Phone Number */}
                <div>
                  <label className="font-serif text-lg block mb-1" htmlFor="phone">
                    Phone Number
                  </label>
                  <input type="tel" id="phone" className="border-black border-2 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Enter phone number" onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                {/* Address */}
                <div>
                  <label className="font-serif text-lg block mb-1" htmlFor="address">
                    Address
                  </label>
                  <input type="text" id="address" className="border-black border-2 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Enter address" onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
              <SubmitButton />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
