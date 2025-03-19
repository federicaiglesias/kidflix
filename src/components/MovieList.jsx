import { useEffect, useState } from "react";
import axios from "axios";
import "../MovieList.css";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieItem from "./MovieItem";
import RatingFilter from "./RatingFilter";
import Hero from "./Hero";
import DisneyMovies from "./DisneyMovies";
import DreamworksMovies from "./DreamworksMovies";
import MostPopularLastScicle from "./MostPopularLastScicle";
import TopKidsMovies from "./TopMovies";
import AdventureMovies from "./AdventureMovies";
import ComedyMovies from "./ComedyMovies";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=5acbc10fda88dccf691b96fe9829ade1&vote_average.gte=${
            rating * 2 - 2
          }&vote_count.gte=1000&page=${page}&with_genres=10751,16`
        );
        setMovies((prevMovies) => {
          return page === 1
            ? response.data.results
            : [...prevMovies, ...response.data.results];
        });
        setHasMore(response.data.page < response.data.total_pages);
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    };
    fetchMovies();
  }, [rating, page]);

  const fetchMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Hero />
      <TopKidsMovies />
      <ComedyMovies />
      <AdventureMovies />
      <DisneyMovies />
      <DreamworksMovies />
      <MostPopularLastScicle />
      <div className="container mb-3">
        <h2 className="mb-3 text-center font">All movies</h2>
        <RatingFilter setRating={setRating} setPage={setPage} />
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreMovies}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="row">
            {movies.map((movie) => (
              <div key={movie.id} className="col-12 col-md-4 col-lg-3 mb-3">
                <MovieItem movie={movie} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default MovieList;
