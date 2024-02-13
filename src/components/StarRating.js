import React from "react";

function StarRating({ averageRating }) {
  if (averageRating === null || averageRating === undefined) {
    return null; // Handle cases where averageRating is null or undefined
  }

  const filledStars = Math.round(averageRating); // Round to the nearest whole number
  const emptyStars = 5 - filledStars;

  return (
    <div>
      {[...Array(filledStars)].map((_, index) => (
        <span key={index} className="staticstar selected">
          &#9733;
        </span>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="staticstar">
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default StarRating;
