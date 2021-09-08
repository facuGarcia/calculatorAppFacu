import React from 'react';

import Topbar from './components/Topbar';
import Home from './screens/Home';
import styles from './styles.module.scss';

const App = () => (
  <div className={styles.wrapper}>
    <Topbar />
    <div className={styles.container}>
      <Home />
    </div>
  </div>
);

export default App;
