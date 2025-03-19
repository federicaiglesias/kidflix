import { Rating } from "react-simple-star-rating";
import "../rating.css";

function RatingFilter({ setRating, setPage }) {
  const handleRating = (rate) => {
    setPage(1);
    setRating(rate); 
  };
  return (
    <div className="container text-center notHide ">
      <h4 className="rating-text">
        Filtrar por rating:
        <Rating onClick={handleRating} size={30} /> & más.
      </h4>
    </div>
  );
}

export default RatingFilter;
