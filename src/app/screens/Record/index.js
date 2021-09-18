import { arrayOf, elementType } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import OperationActions from 'redux/operations/actions';

import RecordLayout from './layout';
import styles from './styles.module.scss';
import handdleFocus from './eventHandlers/eventHandlers';

const Record = ({ operations, dispatch }) => {
  const formatedOperations = operations.map(operation => (
    <div className={styles.operator}>
      <button onClick={() => dispatch(OperationActions.removeOperation(operation.id))}>X</button>
      <div contentEditable id={operation.id} onFocus={() => handdleFocus(operation.id, dispatch)}>
        {operation.expression}
      </div>
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

const mapStateToProps = state => ({ operations: state.operationsRecord.operationsRecord.operations });

export default connect(mapStateToProps)(Record);
