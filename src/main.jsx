import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Importa el Provider
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MovieDetails from "./components/MovieDetails.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import SobreNosotros from "./components/SobreNosotros.jsx";
import Contacto from "./components/Contacto.jsx";
import Layout from "./components/Layout.jsx";
import Buscar from "./components/Buscar.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import store from "./redux/store.js"; // Asegúrate de importar el store

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        element: <SobreNosotros />,
      },
      {
        path: "/contacto",
        element: <Contacto />,
      },
      {
        path: "/buscar",
        element: <Buscar />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
