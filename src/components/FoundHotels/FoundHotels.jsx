import React, { useEffect, useState } from 'react';
import style from './FoundHotels.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import OneHotel from './OneHotel/OneHotel';
import Slider from '../../components/Slider/Slider';

const FoundHotels = () => {
  const hotels = useSelector((state) => state.hotelsReducer.hotels);
  const sliderImages = useSelector((state) => state.hotelsReducer.sliderImages);
  const dateSelect = useSelector((state) => state.hotelsReducer.selectDate);
  const countDay = useSelector((state) => state.hotelsReducer.countDay);
  const favoriteHotels = useSelector((state) => state.authorizationReducer.favoriteHotels);

  const loading = useSelector((state) => state.hotelsReducer.loading);
  const error = useSelector((state) => state.hotelsReducer.error);

  const [hotelEnding, setHotelEnding] = useState('');

  // Генерация окончания количества отелей
  function generateHotelEnding(count) {
    if (+count === 1) {
      return 'отель';
    } else if (count > 1 && count < 5) {
      return 'отеля';
    } else {
      return 'отелей';
    }
  }
  const checkFavoriteHotel = (item) => {
    return favoriteHotels.some((hotel) => hotel.hotelId === item.hotelId);
  };

  useEffect(() => {
    setHotelEnding(generateHotelEnding(favoriteHotels.length));
  }, [favoriteHotels.length]);
  return (
    <div className={style.found_hotels} tabIndex={4}>
      <div className={style.hotel_info}>
        <span>
          {'Отели'}{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none">
            <path
              d="M1 1.33334L9.66667 10L1 18.6667"
              stroke="#A7A7A7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>{' '}
          {error || hotels[0]?.location?.name || (loading ? '...' : hotels[0]?.location?.name)}
        </span>
        <span className={style.date_select}>{dateSelect}</span>
      </div>
      <Slider slideData={sliderImages}/>
      <p className={style.favorite_hotels_count}>
        Добавлено в Избранное: <b>{favoriteHotels.length}</b> {hotelEnding}
      </p>
      {error || ''}
      <div className={style.scrolling_hotels}>
        {!loading ? (
          hotels?.map((item, index) => {
            const isFavoriteHotel  = checkFavoriteHotel(item)
            return (
              <OneHotel
                key={index}
                item={item}
                dateSelect={dateSelect}
                countDay={countDay}
                isFavoriteHotel={isFavoriteHotel}
              />
            );
          })
        ) : (
          <div className={style.loading}>
            <div className={style.loading_circle}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundHotels;
