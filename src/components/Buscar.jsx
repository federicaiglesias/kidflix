import { useState, useEffect } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import InfiniteScroll from "react-infinite-scroll-component";

function Buscar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const API_KEY = "5acbc10fda88dccf691b96fe9829ade1";
  const ALLOWED_GENRES = [10751, 16]; // Familia y Animación

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: API_KEY,
              query: query,
              page: page,
            },
          }
        );

        // Filtrar solo películas que contengan los géneros permitidos
        const filteredMovies = response.data.results.filter(
          (movie) =>
            movie.genre_ids &&
            movie.genre_ids.some((id) => ALLOWED_GENRES.includes(id))
        );

        if (filteredMovies.length > 0) {
          setResults((prevMovies) =>
            page === 1 ? filteredMovies : [...prevMovies, ...filteredMovies]
          );
          setHasMore(response.data.page < response.data.total_pages);
          setNoResults(false);
        } else {
          if (page === 1) {
            setNoResults(true);
            setResults([]);
          }
        }
      } catch (error) {
        console.error("Error al buscar películas:", error);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  const fetchMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mt-5 pt-5">
      <h2>BUSCAR PELÍCULAS</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="BUSCAR POR TÍTULO..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
            setNoResults(false);
          }}
        />
      </div>
      <InfiniteScroll
        dataLength={results.length}
        next={fetchMoreMovies}
        hasMore={hasMore}
      >
        <div className="row">
          {results.length > 0 ? (
            results.map((movie) => (
              <div key={movie.id} className="col-3 mt-3">
                <MovieItem movie={movie} />
              </div>
            ))
          ) : noResults ? (
            <h4 className="mt-3 text-danger">
              Lo sentimos, no hay coincidencias en la búsqueda.
            </h4>
          ) : null}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Buscar;
