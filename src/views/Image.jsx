import { useEffect, useState } from "react";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from "toastify-js";

export default function Image() {
  const [cuisine, setCuisine] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchData() {
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

  async function handleUpload(file) {
    try {
      const form = new FormData();
      form.append("file", file);

      const { data } = await axios.patch(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");
      Toastify({
        text: data.message,
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
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Upload Image</title>
      <main>
        <div className="flex w-screen h-screen justify-center items-center bg-gray-100">
          <div className="bg-white w-1/3 h-4/5 rounded-lg p-6 shadow-lg">
            {/* Form Header */}
            <div className="flex w-full justify-center items-center mb-4">
              <h1 className="font-serif text-black text-4xl">Upload Image</h1>
            </div>
            <hr className="w-5/6 h-px bg-gray-800 border-0 mb-6 mx-auto" />
            {/* Form */}
            <form
              className="flex flex-col items-center"
              onSubmit={(e) => {
                e.preventDefault();
                const file = document.getElementById(`upload${id}`).files[0];
                handleUpload(file);
              }}
            >
              <div className="w-full mb-4">
                <label className="font-serif text-lg block mb-2" htmlFor="currentImage">
                  Current Image
                </label>
                <img src={cuisine.imgUrl} alt="Current Entity Image" className="w-full h-40 object-cover rounded-lg" />
              </div>
              {/* Upload New Image */}
              <div className="w-full mb-6">
                <label className="font-serif text-lg block mb-2" htmlFor={`upload${id}`}>
                  Upload New Image
                </label>
                <input type="file" id={`upload${id}`} className="font-serif bg-white text-black px-2 py-1 border-2 border-black rounded-lg w-full cursor-pointer" onChange={(e) => handleUpload(e.target.files[0])} />
              </div>
              {/* Submit Button */}
              <SubmitButton />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
