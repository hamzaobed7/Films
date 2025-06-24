import React from "react";
import star from "../public/start.svg";
const MovieCard = ({ card }) => {
  const imageURL = card.poster_path
    ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card">
      <img src={imageURL} alt={card.title} />
      <div className="mt-3 text-white">{card.title}</div>
      <div className="content">
        <div className="rating">
          <img src={star} alt="rating" />
          <p>{card.vote_average.toFixed(1)}</p>
        </div>
        <span>.</span>

        <p className="lang"> {card.original_language}</p>

        <span>.</span>

        <p className="year"> {card.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
