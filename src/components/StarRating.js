import React from "react";

function StarRating({ averageRating }) {
  const filledStars = Math.round(averageRating); // Round to the nearest whole number
  const emptyStars = 5 - filledStars;

  return (
    <div>
      {[...Array(filledStars)].map((_, index) => (
        <span key={index} className="star selected">
          &#9733;
        </span>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="star">
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default StarRating;
