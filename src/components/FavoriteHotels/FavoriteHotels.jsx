import React, { useEffect, useState } from 'react';
import style from './FavoriteHotels.module.scss';
import { useSelector } from 'react-redux';
import FavoriteHotel from './FavoriteHotel/FavoriteHotel';
import { ReactComponent as SortUpImage } from './images/sortup.svg';
import { ReactComponent as SortDownImage } from './images/sortdown.svg';
import { ReactComponent as SortDisable } from './images/sortdisable.svg';

const FavoriteHotels = () => {
  const hotels = useSelector((state) => state.authorizationReducer.favoriteHotels);
  const dateSelect = useSelector((state) => state.hotelsReducer.selectDate);
  const countDay = useSelector((state) => state.hotelsReducer.countDay);

  const [{ activePriceSort, activeRatingSort }, setActiveSort] = useState({
    activePriceSort: {
      switchPrice: true,
      active: false,
    },
    activeRatingSort: {
      switchRating: true,
      active: true,
    },
  });
  
  const [sortedHotels, setSortedHotels] = useState(hotels);

  useEffect(() => {
    setSortedHotels(hotels);
  }, [hotels]);

  const sortHotelsByRating = () => {
    setActiveSort({
      activePriceSort: {
        switchPrice: false,
        active: false,
      },
      activeRatingSort: {
        switchRating: !activeRatingSort.switchRating,
        active: true,
      },
    });
    if (activeRatingSort.switchRating) {
      setSortedHotels([...sortedHotels].sort((prev, next) => next.starsHotel - prev.starsHotel));
    } else {
      setSortedHotels([...sortedHotels].sort((prev, next) => prev.starsHotel - next.starsHotel));
    }
  };

  const sortHotelsByPrice = () => {
    setActiveSort({
      activePriceSort: {
        switchPrice: !activePriceSort.switchPrice,
        active: true,
      },
      activeRatingSort: {
        switchRating: false,
        active: false,
      },
    });
    if (activePriceSort.switchPrice) {
      setSortedHotels([...sortedHotels].sort((prev, next) => next.price - prev.price));
    } else {
      setSortedHotels([...sortedHotels].sort((prev, next) => prev.price - next.price));
    }
  };

  return (
    <aside className={style.favorite_hotels} tabIndex={3}>
      <h1 className={style.header_favorite}>Избранное</h1>
      <div className={style.sort_favorite_hotels}>
        <label
          onClick={sortHotelsByRating}
          className={`${style.hotels_sort} ${activeRatingSort.active ? style.active_sort : ''}`}>
          <p>Рейтинг</p>
          {activeRatingSort.active ? (
            activeRatingSort.switchRating ? (
              <SortUpImage />
            ) : (
              <SortDownImage />
            )
          ) : (
            <SortDisable />
          )}
        </label>
        <label
          onClick={sortHotelsByPrice}
          className={`${style.hotels_sort} ${activePriceSort.active ? style.active_sort : ''}`}>
          <p>Цена</p>
          {activePriceSort.active ? (
            activePriceSort.switchPrice ? (
              <SortUpImage />
            ) : (
              <SortDownImage />
            )
          ) : (
            <SortDisable />
          )}
        </label>
      </div>
      <div className={style.scrolling_hotels}>
        {sortedHotels?.map((item, index) => {
          return (
            <FavoriteHotel
              key={index}
              item={item}
              dateSelect={dateSelect}
              countDay={countDay}
              isFavorite={true}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default FavoriteHotels;
