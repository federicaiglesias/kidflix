import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TopKidsMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: "5acbc10fda88dccf691b96fe9829ade1",
              with_genres: "10751,16", // Géneros de Familia y Animación
              sort_by: "popularity.desc",
              page: 1,
            },
          }
        );

        // Filtramos las películas que tienen más de 100 votos
        const filteredMovies = response.data.results.filter(
          (movie) => movie.vote_count >= 100
        );
        setMovies(filteredMovies.slice(0, 10)); // Solo las 10 primeras películas
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Cargando películas...</p>;
  if (error) return <p>Error al cargar las películas.</p>;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="top-movies container mb-4">
      <h2 className="mb-3">Most popular at the moment</h2>
      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000}>
        {movies.map((movie) => (
          <div className="me-3" key={movie.id}>
            <MovieItem movie={movie} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopKidsMovies;
