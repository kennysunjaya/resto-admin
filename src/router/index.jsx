import AddUserForm from "../views/AddUserForm";
import CategoriesTable from "../views/CategoriesTable";
import CreateForm from "../views/CreateForm";
import CuisineTable from "../views/CuisineTable";
import EditForm from "../views/EditForm";
import Image from "../views/Image";
import Login from "../views/Login";
import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from "toastify-js";
import BaseLayout from "../views/BaseLayout";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You already logged in",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#F87171",
            color: "#000000",
          },
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please log in first",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#F87171",
            color: "#000000",
          },
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <CuisineTable />,
      },
      {
        path: "/categories",
        element: <CategoriesTable />,
      },
      {
        path: "/add",
        element: <CreateForm />,
      },
      {
        path: "/edit/:id",
        element: <EditForm />,
      },
      {
        path: "/image/:id",
        element: <Image />,
      },
      {
        path: "/add-user",
        element: <AddUserForm />,
      },
    ],
  },
]);

export default router;
