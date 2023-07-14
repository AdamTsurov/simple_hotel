import React, { useEffect } from 'react';
import style from './Main.module.scss';
import Header from '../../components/Header/Header';
import SearchHotel from '../../components/SearchHotel/SearchHotel';
import FavoriteHotels from '../../components/FavoriteHotels/FavoriteHotels';
import FoundHotels from '../../components/FoundHotels/FoundHotels';

import { useDispatch } from 'react-redux';
import { getHotels, getSliderImages } from '../../reducers/slice/hotelSlice';
import { getFavoriteHotels } from '../../reducers/slice/userSlice';


const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotels({}));
    dispatch(getFavoriteHotels());
    dispatch(getSliderImages());
  }, []);

  return (
    <>
      <Header />
      <main className={style.main}>
        
        <SearchHotel />
        <FavoriteHotels />
        <FoundHotels />
      </main>
    </>
  );
};

export default Main;
