import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MovieDetails from "./components/MovieDetails.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import SobreNosotros from "./components/SobreNosotros.jsx";
import Contacto from "./components/Contacto.jsx";
import Layout from "./components/Layout.jsx"; // Usa el nuevo Layout
import Buscar from "./components/Buscar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Usa Layout para tener Navbar
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/pelicula/:id",
        element: <MovieDetails />,
      },
      {
        path: "/sobrenosotros",
        element: <SobreNosotros />, // Ruta de Sobre Nosotros
      },
      {
        path: "/contacto",
        element: <Contacto />, // Ruta de Contacto
      },
      {
        path: "/buscar",
        element: <Buscar />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/movie/:id",
    element: <Navigate replace to="/pelicula/:id" />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
