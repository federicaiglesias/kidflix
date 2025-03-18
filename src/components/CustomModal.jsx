import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import "../modal.css"; // Archivo de estilos para el modal

function CustomModal({ show, movie, setShowModal }) {
  if (!movie) return null;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseModal}
        className="modal-style"
        centered
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <p>
            <strong>Fecha de publicación: </strong>
            {movie.release_date}
          </p>
          <p>
            <strong>Resumen: </strong> {movie.overview}
          </p>
          <p>
            <strong>Rating: </strong> {movie.vote_average}
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="warning" className="modal-button">
            <Link
              to={`/pelicula/${movie.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Más Detalles...
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;
