import React, { useState } from 'react';
import style from './RatingStars.module.scss';

const RatingStars = ({ stars, count = 5 }) => {
  return (
    <div className={style.rating_stars}>
      {[...Array(count)].map((_, index) => {
        return (
          <svg key={index} viewBox="0 0 20 20" style={{ width: '100%', height: '100%' }} className={style.star}>
            <polygon
              points="10,0 13.07,6.93 20,8.08 15.45,13.13 16.36,20 10,16 3.64,20 4.55,13.13 0,8.08 6.93,6.93"
              fill={index < stars ? '#CDBC1E' : '#6C6845'}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default RatingStars;
