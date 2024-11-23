import SubmitButton from "../components/SubmitButton";
import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://h8-phase2-gc.vercel.app/apis/login", { email, password });
      localStorage.setItem("access_token", data.data.access_token);
      navigate("/");
      Toastify({
        text: "Login success",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
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
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#F87171",
          color: "#000000",
        },
      }).showToast();
    }
  }

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Login</title>
      <main>
        {/* Centered Container with Light Background */}
        <div className="flex w-screen h-screen justify-center items-center bg-gray-100">
          <div className="bg-white w-1/3 h-4/5 rounded-lg p-6 shadow-lg">
            {/* Form Header */}
            <div className="flex w-full h-1/3 justify-center items-center mb-4">
              <h1 className="font-serif text-black text-6xl">LOGIN</h1>
            </div>
            <form className="flex flex-col w-full h-2/3 justify-center items-center" onSubmit={handleLogin}>
              <hr className="w-5/6 h-px bg-gray-800 border-0 mb-16 mx-auto" />
              <label className="font-serif text-xl block mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                className="border-black border-2 rounded-lg w-2/3 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="font-serif text-xl block mb-1 mt-4">Password</label>
              <input
                type="password"
                id="password"
                className="border-black border-2 rounded-lg w-2/3 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <SubmitButton />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
