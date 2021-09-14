import { arrayOf, elementType } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import RecordLayout from './layout';
import styles from './styles.module.scss';

const Record = ({ operations }) => {
  const formatedOperations = operations.map(operator => <div className={styles.operator}>{operator}</div>);
  return (
    <div className={styles.container}>
      <RecordLayout operations={formatedOperations} />
    </div>
  );
};

Record.propTypes = {
  operations: arrayOf(elementType)
};

const mapStateToProps = state => ({ operations: state.operationsRecord.operations });

export default connect(mapStateToProps)(Record);
