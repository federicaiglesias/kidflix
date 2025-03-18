import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <>
      <div className="googleFont">
        <Navbar />
        <MovieList />
        <MovieDetails />
      </div>
    </>
  );
}

export default App;
