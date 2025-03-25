import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdMovieFilter } from "react-icons/md";
import "../movieDetails.css";

function MovieDetails() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Controlar el modal

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=5acbc10fda88dccf691b96fe9829ade1`
        );
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        const data = await response.json();
        setMovie(data);
        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=5acbc10fda88dccf691b96fe9829ade1`
        );
        if (!videoResponse.ok) {
          throw new Error("No videos found");
        }
        const videoData = await videoResponse.json();

        const trailer = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setVideo(trailer);
        setError(false);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [params.id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="loading-text">Loading movie...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error: movie not found.</h2>
        <p>Sorry, we couldn't find any details from the selected movie.</p>
        <Button variant="warning" className="back-home-btn">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Volver a la Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div
        className="movie-details-page"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="movie-details-container">
          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-description">{movie.overview}</p>
            <div className="d-flex justify-content-center">
              <p className="movie-description me-3">
                <strong>Rating:</strong> {movie.vote_average}
              </p>
              <p className="movie-description">
                <strong>Release date: </strong>
                {movie.release_date}
              </p>
            </div>

            <div className="d-flex justify-content-center">
              <Button
                variant="warning"
                className="watch-trailer-btn d-flex px-3 py-2 mb-3"
                onClick={() => setShowModal(true)}
              >
                <div>Watch trailer</div>
              </Button>
            </div>
            <div className="d-flex justify-content-start">
              <Button variant="warning" className="back-home-btn">
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <IoIosArrowRoundBack />
                  <IoHomeOutline />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        onShow={() => {
          const iframe = document.getElementById("trailer-video");
          if (iframe) {
            iframe.requestFullscreen?.();
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            id="trailer-video"
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${video?.key}?autoplay=1&fs=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MovieDetails;
