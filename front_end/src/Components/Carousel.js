import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../Style/Carousel.scss'; 

const Carousel = () => {
  const slidesRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 3; 

  useEffect(() => {
    slidesRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, [currentIndex]);

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % totalSlides);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="carousel">
      <ul className="slides" ref={slidesRef}>
        <li className="slide" style={{ backgroundImage: `url(/dummy/gallery-1.jpg)` }}>
          <div className="content">
            <h2 className="slide-title">Libérez l'adrénaline, vivez le paintball !</h2>
            <Link to="/recherche">
              <Button className="carousel-button" variant="primary">Réservez-Maintenant</Button>
            </Link>
          </div>
        </li>
        <li className="slide" style={{ backgroundImage: `url(/dummy/slide-1.jpg)` }}>
          <div className="content">
            <h2 className="slide-title">Libérez l'adrénaline, vivez le paintball !</h2>
            <Link to="/recherche">
              <Button className="carousel-button" variant="primary">Réservez-Maintenant</Button>
            </Link>
          </div>
        </li>
        <li className="slide" style={{ backgroundImage: `url(/dummy/slide-13.jpg)` }}>
          <div className="content">
            <h2 className="slide-title">Libérez l'adrénaline, vivez le paintball !</h2>
            <Link to="/recherche">
              <Button className="carousel-button" variant="primary">Réservez-Maintenant</Button>
            </Link>
          </div>
        </li>
      </ul>

      <div className="controls">
        <button className="prev" onClick={goToPreviousSlide}>❮</button>
        <button className="next" onClick={goToNextSlide}>❯</button>
      </div>

      <div className="dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
