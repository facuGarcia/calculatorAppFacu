import { arrayOf, elementType } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import OperationActions from 'redux/operations/actions';

import RecordLayout from './layout';
import styles from './styles.module.scss';

const Survey = () => {
  return (
    <div className={styles.container}>
      <RecordLayout />
    </div>
  );
};

export default connect()(Survey);
