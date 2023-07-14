import React, { useState } from 'react';
import style from './SearchHotel.module.scss';
import { useDispatch } from 'react-redux';
import { getHotels, setCount, setDate } from '../../reducers/slice/hotelSlice';
import moment from 'moment';

const SearchHotel = () => {
  const [location, setLocation] = useState('Москва');
  const [selectedDate, setSelectedDate] = useState(moment());
  const [countDay, setCountDay] = useState(1);

  const dispatch = useDispatch();

  const getSelectedHotels = (e) => {
    e.preventDefault();
    const select = moment(selectedDate);
    const checkOutDate = select.add(countDay, 'days').format('YYYY-MM-DD')
    dispatch(
      getHotels({
        location,
        checkIn: selectedDate.format('YYYY-MM-DD'), 
        checkOut: checkOutDate,
      }),
    );
    dispatch(setCount(countDay.toString()));
    dispatch(
      setDate(
        new Date(selectedDate).toLocaleString('ru', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      ),
    );
  };

  return (
    <aside className={style.search_hotel} tabIndex={2}>
      <form className={style.form_search} onSubmit={getSelectedHotels}>
        <label className={style.header_input}>
          Локация
          <input
            type="text"
            className={style.input}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label className={style.header_input}>
          Дата заселения
          <input
            type="date"
            className={style.input}
            value={selectedDate.format('YYYY-MM-DD')}
            onChange={(e) => {
              setSelectedDate(moment(e.target.value));
            }}
          />
        </label>
        <label className={style.header_input}>
          Количество дней
          <input
            type="text"
            className={style.input}
            value={countDay}
            onChange={(e) => setCountDay(e.target.value)}
          />
        </label>
        <button className={style.search_button} type="submit">
          Найти
        </button>
      </form>
    </aside>
  );
};

export default SearchHotel;
