import React from 'react';
import style from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../reducers/slice/userSlice';

const Header = () => {

  const dispatch = useDispatch();

  const exitAccount = () => {
    dispatch(signOut());

  };

  return (
    <header className={style.header}>
      <h1 className={style.logo}>Simple Hotel Check</h1>
      <span className={style.exit} tabIndex={1} onClick={exitAccount}>
        Выйти
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
            stroke="#41522E"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 17L21 12L16 7"
            stroke="#41522E"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12H9"
            stroke="#41522E"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </header>
  );
};

export default Header;
