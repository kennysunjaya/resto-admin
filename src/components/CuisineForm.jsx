import SubmitButton from "./SubmitButton";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CuisineForm({ nameProp, handleSubmit, cuisine }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  async function fetchCategories() {
    try {
      const { data } = await axios.get("https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (cuisine) {
      setName(cuisine?.name);
      setDescription(cuisine?.description);
      setPrice(cuisine?.price);
      setImgUrl(cuisine?.imgUrl);
      setStock(cuisine?.stock);
      setCategoryId(cuisine?.categoryId);
    }
  }, [cuisine]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title> Form </title>
      <main>
        <div className="flex w-screen h-screen justify-center items-center bg-gray-100">
          <div className="bg-white w-2/3 rounded-lg p-6 shadow-lg">
            {/* Form Header */}
            <div className="flex w-full justify-center items-center mb-4">
              <h1 className="font-serif text-black text-4xl">{nameProp} Cuisine Form</h1>
            </div>
            <p className="font-serif text-center text-lg mb-6">Fill in the details below.</p>
            <hr className="w-5/6 h-px bg-gray-800 border-0 mb-6 mx-auto" />
            {/* Cuisine Form */}
            <form onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, stock, categoryId)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Name */}
                <div>
                  <label className="font-serif text-lg block mb-1">Name</label>
                  <input type="text" id="name" className="border-black border-2 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Enter cuisine name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                {/* Description */}
                <div>
                  <label className="font-serif text-lg block mb-1">Description</label>
                  <input type="text" id="description" className="border-black border-2 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                {/* Price */}
                <div>
                  <label className="font-serif text-lg block mb-1">Price</label>
                  <input type="number" id="price" className="border-black border-2 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                {/* Image URL */}
                <div>
                  <label className="font-serif text-lg block mb-1">Image URL</label>
                  <input type="text" id="imgUrl" className="border-black border-2 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Enter image URL" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                </div>

                {/* Category */}
                <div>
                  <label className="font-serif text-lg block mb-1">Category</label>
                  <select id="categoryId" className="border-black border-2 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    {categories.map((c) => {
                      return (
                        <option key={c.id} value={c.id}>
                          {" "}
                          {c.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Stock */}
                <div>
                  <label className="font-serif text-lg block mb-1">Stock</label>
                  <input type="number" id="price" className="border-black border-2 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Enter stock" value={0} onChange={(event) => setStock(0)} />
                </div>
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
