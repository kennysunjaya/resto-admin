import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import { useState, useEffect } from "react";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import CuisineForm from "../components/CuisineForm";

export default function CreateForm() {
  const navigate = useNavigate();

  async function handleSubmit(e, name, description, price, imgUrl, stock, categoryId) {
    try {
      e.preventDefault();

      const body = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId };

      const { data } = await axios.post("https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines", body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");
      Toastify({
        text: `Succeed add data ${data.data.name}`,
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
      <CuisineForm handleSubmit={handleSubmit} nameProp="Add" />
    </>
  );
}
