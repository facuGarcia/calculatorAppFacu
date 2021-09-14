import { Button } from '@material-ui/core';
import { arrayOf, elementType } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import OperationActions from 'redux/operations/actions';

import RecordLayout from './layout';
import styles from './styles.module.scss';

const Record = ({ operations, dispatch }) => {
  const formatedOperations = operations.map(operator => (
    <div className={styles.operator}>
      <Button onClick={() => dispatch(OperationActions.removeOperation(operator))}>X</Button>
      {operator}
    </div>
  ));
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
