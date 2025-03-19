import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function MostPopularLastScicle() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMostPopularLastScicle = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=5acbc10fda88dccf691b96fe9829ade1&with_companies=2&primary_release_date.lte=1999-12-31&sort_by=popularity.desc

`
        );
        if (!response.ok) {
          throw new Error("No se pudieron cargar las películas");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMostPopularLastScicle();
  }, []);

  if (loading) return <p>Cargando películas de Disney...</p>;
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
    <div className="disney-carousel container">
      <h2>All times classics</h2>
      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000}>
        {movies.map((movie) => (
          <div className="me-3" key={movie.id}>
            <MovieItem movie={movie} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default MostPopularLastScicle;
