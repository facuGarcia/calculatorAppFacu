import React from 'react';
import { connect } from 'react-redux';

import SurveyLayout from './layout';
import styles from './styles.module.scss';

const Survey = () => (
  <div className={styles.container}>
    <SurveyLayout />
  </div>
);

export default connect()(Survey);
