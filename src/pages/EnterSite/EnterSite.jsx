import React from 'react';
import EnterWindow from '../../components/EnterWindow/EnterWindow.jsx';
import style from './EnterSite.module.scss'

const EnterSite = () => {
  return (
    <div className={style.enter_site}>
      <EnterWindow />
    </div>
  );
};

export default EnterSite;