import React, { useState } from "react";
import CustomModal from "./CustomModal";
import "../MovieItem.css";

function MovieItem({ movie }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const [show, setShowModal] = useState(false);

  if (!movie.poster_path) return null;

  return (
    <>
      <img
        src={`${imageBaseUrl}${movie.poster_path}`}
        alt={movie.title}
        className="img-fluid movie-img"
        onClick={() => setShowModal(true)}
      />
      <CustomModal movie={movie} show={show} setShowModal={setShowModal} />
    </>
  );
}

export default MovieItem;
