import React from 'react';
import { UTLabel } from '@widergy/energy-ui';

import logo from 'app/assets/logoBlanco.png';

import styles from './styles.module.scss';

const Topbar = () => (
  <div className={styles.container}>
    <UTLabel bold large white>
      {'Calculadora'}
    </UTLabel>
    <img alt="logo" src={logo} className={styles.logo} />
  </div>
);

export default Topbar;
