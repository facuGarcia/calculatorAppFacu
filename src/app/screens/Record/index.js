import { arrayOf, elementType } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import OperationActions from 'redux/operations/actions';

import RecordLayout from './layout';
import styles from './styles.module.scss';

const Record = ({ operations, dispatch }) => {
  const handdleFocus = id => {
    window.addEventListener('keypress', function handler(event) {
      if (event.key === 'Enter') {
        event.currentTarget.removeEventListener(event.type, handler);
        document.getElementById(id).blur();
        dispatch(OperationActions.modifyOperation(id, document.getElementById(id).textContent));
      }
    });
  };

  const formatedOperations = operations.map(operation => (
    <div className={styles.operator}>
      <button onClick={() => dispatch(OperationActions.removeOperation(operation.id))}>X</button>
      <div contentEditable id={operation.id} onFocus={() => handdleFocus(operation.id)}>
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
