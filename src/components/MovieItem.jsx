import React, { useState } from "react";
import "../MovieItem.css";
import { Link } from "react-router-dom";

function MovieItem({ movie }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  if (!movie.poster_path) return null;

  return (
    <>
    <Link to={`/pelicula/${movie.id}`}>
      <img
        src={`${imageBaseUrl}${movie.poster_path}`}
        alt={movie.title}
        className="img-fluid movie-img"
      />
      </Link>
    </>
  );
}

export default MovieItem;
