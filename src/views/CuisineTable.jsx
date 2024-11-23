import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function CuisineTable({}) {
  const [cuisines, setCuisines] = useState([]);
  const navigate = useNavigate();

  async function fetchCuisine() {
    try {
      const { data } = await axios.get("https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCuisines(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      fetchCuisine();

      Toastify({
        text: `Succeed delete data`,
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
    fetchCuisine();
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>List Table</title>

      {/* Main Content */}
      <main className="flex flex-col items-center py-10">
        <div className="bg-white w-4/5 rounded-lg p-6 text-black">
          <h1 className="font-serif text-center text-4xl mb-6">List of Cuisines</h1>
          <hr className="w-5/6 h-px bg-black border-0 mb-6 mx-auto" />
          {/* Add Item Button */}
          <Link to={"/add"} className="font-serif px-2.5 py-1 rounded bg-[#2a9d8f] mb-6 text-white">
            {" "}
            Add Item{" "}
          </Link>
          {/* Table */}
          <table className="w-full border-collapse border mt-6 border-black text-left">
            {/* Table Head */}
            <thead className="font-serif bg-[#393e41] text-white">
              <tr>
                <th className="border border-black px-4 py-2">#</th>
                <th className="border border-black px-4 py-2">Name</th>
                <th className="border border-black px-4 py-2">Image</th>
                <th className="border border-black px-4 py-2">Description</th>
                <th className="border border-black px-4 py-2">Price</th>
                <th className="border border-black px-4 py-2">Author ID</th>
                <th className="border border-black px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {cuisines.map((cuisine, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-black px-4 py-2">{cuisine.id}</td>
                    <td className="border border-black px-4 py-2">{cuisine.name}</td>
                    <td className="border border-black px-4 py-2">
                      <img src={cuisine.imgUrl} className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="border border-black px-4 py-2">{cuisine.description}</td>
                    <td className="border border-black px-4 py-2">{cuisine.price}</td>
                    <td className="border border-black px-4 py-2">{cuisine.User?.username}</td>
                    <td className="border border-black px-4 py-2 text-center">
                      <div className="flex gap-2">
                        <button onClick={() => handleDelete(cuisine.id)} className="font-serif px-2.5 py-1 rounded bg-[#e63946] text-white">
                          Delete
                        </button>
                        <Link to={`/edit/${cuisine.id}`} className="font-serif px-2.5 py-1 rounded bg-[#2a9d8f] text-white">
                          Edit
                        </Link>
                        <Link to={`/image/${cuisine.id}`} className="font-serif px-2.5 py-1 rounded bg-[#e9c46a] text-black">
                          Image
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
