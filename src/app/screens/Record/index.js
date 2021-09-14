import React from 'react';
import { connect } from 'react-redux';

import RecordLayout from './layout';
import styles from './styles.module.scss';

const Record = ({ operations }) => {
  const formatedOperations = operations.map(op => <div className={styles.op}>{op}</div>);
  return (
    <div className={styles.container}>
      <RecordLayout operations={formatedOperations} />
    </div>
  );
};

const mapStateToProps = state => ({ operations: state.operationsRecord.operations });

export default connect(mapStateToProps)(Record);
