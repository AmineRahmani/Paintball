import React, { useState } from 'react';
import './Style/starrating.scss';

const StarRating = ({ count = 5, value, onChange }) => {
  const [hover, setHover] = useState(0);

  const handleClick = (newValue) => {
    if (newValue === value) {
      onChange(0); // Si la même étoile est cliquée deux fois, annule la note
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="starrating">
      {Array.from({ length: count }, (_, index) => index + 1).map(star => (
        <React.Fragment key={star}>
          <input
            type="radio"
            id={`star${star}`}
            name="rating"
            value={star}
            checked={value === star}
            onChange={() => handleClick(star)}
          />
          <label
            htmlFor={`star${star}`}
            title={`${star} star`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{ color: star <= (hover || value) ? '#ffca08' : '#222222' }}
          >
            <i className="fa fa-star"></i>
          </label>
        </React.Fragment>
      ))}
      <div className="rating-value">
        {value}/5
      </div>
    </div>
  );
};

export default StarRating;
