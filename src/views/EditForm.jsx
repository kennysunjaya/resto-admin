import { useParams } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import { useState, useEffect } from "react";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import CuisineForm from "../components/CuisineForm";

export default function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cuisine, setCuisine] = useState({});

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setCuisine(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e, name, description, price, imgUrl, stock, categoryId) {
    try {
      e.preventDefault();

      const body = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId };
      const { data } = await axios.put(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");

      Toastify({
        text: `Succedd edit product`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
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

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <CuisineForm handleSubmit={handleSubmit} cuisine={cuisine} nameProp="Edit" />
    </>
  );
}
