import { arrayOf, elementType } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import OperationActions from 'redux/operations/actions';

import RecordLayout from './layout';
import styles from './styles.module.scss';

const Record = ({ operations, dispatch }) => {
  const handdleFocus = index => {
    window.addEventListener('keypress', function handler(event) {
      if (event.key === 'Enter') {
        event.currentTarget.removeEventListener(event.type, handler);
        document.getElementById(index).blur();
        dispatch(OperationActions.modifyOperation(index, document.getElementById(index).textContent));
      }
    });
  };

  const formatedOperations = operations.map(operation => (
    <div className={styles.operator}>
      <button onClick={() => dispatch(OperationActions.removeOperation(operation.index))}>X</button>
      <div contentEditable id={operation.index} onFocus={() => handdleFocus(operation.index)}>
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
