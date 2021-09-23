import React from 'react';
import { connect } from 'react-redux';

import SurveyLayout from './layout';
import styles from './styles.module.scss';

const SurveyConteiner = () => (
  <div className={styles.container}>
    <SurveyLayout />
  </div>
);

export default connect()(SurveyConteiner);
