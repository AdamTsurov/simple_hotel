import React from 'react';
import style from './EnterWindow.module.scss';
import Authorization from './Authorization/Authorization';

const EnterWindow = () => {

  return (
    <div className={style.enter_window}>
      <p className={style.header}>Simple Hotel Check</p>
      <div className={style.authorization}>
        <Authorization/>
      </div>
    </div>
  );
};

export default EnterWindow;
