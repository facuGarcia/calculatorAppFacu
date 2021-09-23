import { arrayOf, elementType } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import OperationActions from 'redux/operations/actions';

import Record from './layout';
import styles from './styles.module.scss';
import handdleFocus from './eventHandlers/eventHandlers';

const RecordContainer = ({ operations, dispatch }) => {
  const formatedOperations = operations.map(operation => (
    <div className={styles.operator}>
      <button onClick={() => dispatch(OperationActions.removeOperation(operation.index))}>X</button>
      <div contentEditable id={operation.index} onFocus={() => handdleFocus(operation.index, dispatch)}>
        {operation.expression}
      </div>
    </div>
  ));
  return (
    <div className={styles.container}>
      <Record operations={formatedOperations} />
    </div>
  );
};

RecordContainer.propTypes = {
  operations: arrayOf(elementType)
};

const mapStateToProps = state => ({ operations: state.operationsRecord.operations });

export default connect(mapStateToProps)(RecordContainer);
