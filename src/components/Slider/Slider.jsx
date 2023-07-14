import React, { useState, useEffect, useRef } from 'react';
import styles from './Slider.module.scss';

const Slider = ({ slideData = [{ image: '' }] }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const autoScrollTimerRef = useRef(null);

  useEffect(() => {
    if (isAutoScrollActive) {
      autoScrollTimerRef.current = setInterval(goToNextSlide, 3000);
    } else {
      clearInterval(autoScrollTimerRef.current);
    }

    return () => {
      clearInterval(autoScrollTimerRef.current);
    };
  }, [isAutoScrollActive]);

  const handlePrevSlide = () => {
    setActiveSlide((prevSlide) => {
      if (prevSlide === 0) {
        return slideData.length - 1;
      } else {
        return prevSlide - 1;
      }
    });
    stopAutoScroll();
  };

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) => {
      if (prevSlide === slideData.length - 1) {
        return 0;
      } else {
        return prevSlide + 1;
      }
    });
    stopAutoScroll();
  };

  const goToNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === slideData.length - 1 ? 0 : prevSlide + 1));
  };

  const stopAutoScroll = () => {
    setIsAutoScrollActive(false);
    setTimeout(() => {
      setIsAutoScrollActive(true);
    }, 3000); // После 3 секунд без взаимодействия, активируется автоматическая прокрутка
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider} style={{ transform: `translateX(-${activeSlide * 100}px)` }}>
        {slideData.map((slide, index) => (
          <div
            key={index}
            className={styles.slide}
            style={{ backgroundImage: `url(${slide.image})` }}></div>
        ))}
      </div>
      <button className={styles.prevButton} onClick={handlePrevSlide}>
        {'<'}
      </button>
      <button className={styles.nextButton} onClick={handleNextSlide}>
        {'>'}
      </button>
    </div>
  );
};

export default Slider;
