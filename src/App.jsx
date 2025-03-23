import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";

// Carga diferida de componentes
const MovieList = lazy(() => import("./components/MovieList"));
const MovieDetails = lazy(() => import("./components/MovieDetails"));

function App() {
  return (
    <>
      <div className="googleFont">
        <Navbar />
        <Suspense fallback={<p>Loading movies...</p>}>
          <MovieList />
        </Suspense>
        <Suspense fallback={<p>Loading movie details...</p>}>
          <MovieDetails />
        </Suspense>
      </div>
    </>
  );
}

export default App;
