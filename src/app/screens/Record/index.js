/* eslint-disable jsx-a11y/no-static-element-interactions */
import { arrayOf, elementType } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import OperationActions from 'redux/operations/actions';

import Record from './layout';
import styles from './styles.module.scss';
import { handleFocus, handleKeyPress } from './eventHandlers/eventHandlers.js';

const RecordContainer = ({ operations, dispatch }) => {
  const formatedOperations = operations.map(operation => (
    <div className={styles.operator}>
      <button onClick={() => dispatch(OperationActions.removeOperation(operation.index))}>X</button>
      <div
        contentEditable
        id={operation.index}
        onFocus={() => handleFocus(operation.index, dispatch)}
        onKeyPress={event => handleKeyPress(event)}
      >
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
