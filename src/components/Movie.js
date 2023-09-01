import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, img, title, summary, rating }) {
  //   console.log(summary);
  return (
    <div>
      <img src={img} alt={title} />
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <h3>
        <span style={{ color: "#ED7B7B" }}>{rating}</span>/
        <span style={{ fontSize: "14px" }}>10.0</span>
      </h3>
      <p>{summary}</p>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,

  title: PropTypes.string.isRequired,
};

export default Movie;
