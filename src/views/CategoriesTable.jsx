import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoriesTable() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get("https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Categories Table</title>
      {/* Main Content */}
      <main className="flex flex-col items-center py-10">
        <div className="bg-white w-4/5 rounded-lg p-6 text-black shadow-md">
          <h1 className="font-serif text-center text-4xl mb-6">List of Categories</h1>
          <hr className="w-5/6 h-px bg-gray-800 border-0 mb-6 mx-auto" />
          {/* Table */}
          <table className="w-full border-collapse border border-gray-800 text-left">
            {/* Table Head */}
            <thead className="font-serif bg-gray-800 text-white">
              <tr>
                <th className="border border-gray-800 px-4 py-2">ID</th>
                <th className="border border-gray-800 px-4 py-2">Name</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {categories.map((c, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-gray-800 px-4 py-2">{c.id}</td>
                    <td className="border border-gray-800 px-4 py-2">{c.name}</td>
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
