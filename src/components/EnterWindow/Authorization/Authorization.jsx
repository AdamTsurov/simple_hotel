import style from './Authorization.module.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp } from '../../../reducers/slice/userSlice';
import { useNavigate } from 'react-router-dom';

const Authorization = () => {
  const [valueLogin, setValueLogin] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [{ activeAuthorization, activeRegistration }, setActiveText] = useState({
    activeAuthorization: true,
    activeRegistration: false,
  });

  const error = useSelector((state) => state.authorizationReducer.error);
  const dispatch = useDispatch();

  const validDataUser = (e) => {
    e.preventDefault();
    if (activeAuthorization) {
      dispatch(signIn({ email: valueLogin, password: valuePassword }));
    } else {
      dispatch(signUp({ email: valueLogin, password: valuePassword }));
      setValuePassword('');
    }
  };

  return (
    <>
      <form className={style.form_authorization} onSubmit={validDataUser}>
        <label className={style.header_login} htmlFor="login_input">
          Логин
        </label>
        <input
          onChange={(e) => {
            setValueLogin(e.target.value);
          }}
          value={valueLogin}
          type="email"
          id={style.login_input}
          className={style.login_input}
        />
        <label className={style.header_password} htmlFor="password_input">
          Пароль
        </label>
        {error && <span className={style.error}>{error}</span>}
        <input
          onChange={(e) => setValuePassword(e.target.value)}
          value={valuePassword}
          type="password"
          autoComplete="off"
          id={style.password_input}
          className={style.password_input}
        />
        <button className={style.submit_button} type="submit">
          {activeAuthorization ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <span className={style.switch_text_login}>
        <span
          className={activeAuthorization ? style.active_text : ''}
          onClick={() => {
            setActiveText({
              activeAuthorization: true,
              activeRegistration: false,
            });
            setValuePassword('');
          }}>
          Вход
        </span>
        /
        <span
          className={activeRegistration ? style.active_text : ''}
          onClick={() =>
            setActiveText({
              activeAuthorization: false,
              activeRegistration: true,
            })
          }>
          Регистрация
        </span>
      </span>
    </>
  );
};

export default Authorization;
