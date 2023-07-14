import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import style from './FavoriteHotel.module.scss';
import imageFeaturesAdd from '../images/features_add.png';
import RatingStars from '../../RatingStars/RatingStars';
import { useDispatch } from 'react-redux';
import { removeHotelForUser } from '../../../reducers/slice/userSlice';

const FavoriteHotel = ({ item, dateSelect, countDay }) => {
  const favoriteHotelName = item?.hotelName;
  const priceHotel = item?.price;
  const starsHotel = item?.starsHotel;
  const hotelId = item?.hotelId;

  const hotelNameRef = useRef(null);
  const favoriteHotelNameRef = useRef(null);

  const [isTextOverflowed, setIsTextOverflowed] = useState(false);
  const [dayEnding, setDayEnding] = useState('');

  const dispatch = useDispatch();

  function generateDayEnding(count) {
    if (+count === 1) {
      return 'день';
    } else if (+count > 1 && +count < 5) {
      return 'дня';
    } else {
      return 'дней';
    }
  }

  useEffect(() => {
    setDayEnding(generateDayEnding(countDay));
  }, [countDay]);

  useLayoutEffect(() => {
    setIsTextOverflowed(
      favoriteHotelNameRef.current.scrollWidth > hotelNameRef.current.offsetWidth,
    );
  }, []);

  const removeFavoriteHotel = () => {
    dispatch(removeHotelForUser({ hotelId }));
  };

  return (
    <div className={style.favorite_hotel}>
      <div className={style.basic_information}>
        <div className={style.basic_information_block1}>
          <div className={style.hotel_name} ref={hotelNameRef}>
            <p
              className={`${style.text_name} ${isTextOverflowed ? style.scroll_text_name : ''}`}
              ref={favoriteHotelNameRef}>
              {favoriteHotelName}
            </p>
          </div>
          <img
            className={style.favorite_image}
            src={imageFeaturesAdd}
            alt="favorite"
            onClick={removeFavoriteHotel}
          />
        </div>
        <div className={style.basic_information_block2}>
          <p className={style.date_arrival}>{dateSelect}</p>
          <p className={style.count_day}>
            {' '}
            &mdash; {countDay}
            {dayEnding}
          </p>
        </div>
        <div className={style.basic_information_block3}>
          <RatingStars stars={starsHotel} />
          <p className={style.price_hotel}>
            Price: <span className={style.price_text}>{Math.ceil(priceHotel)} ₽</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteHotel;
