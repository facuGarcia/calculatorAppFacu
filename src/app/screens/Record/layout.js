import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { arrayOf, elementType } from 'prop-types';

import OperationActions from 'redux/operations/actions';
import { CALCULATOR } from 'constants/routes';

import styles from './styles.module.scss';

const Record = ({ operations }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.recordTitle}>Historial</div>
      <div className={styles.operations}>{operations}</div>
      <div className={styles.recordButtons}>
        <button className={styles.clear} onClick={() => dispatch(OperationActions.removeAllOperations())}>
          Limpiar
        </button>
        <button className={styles.recToCalcButton} onClick={() => dispatch(push(CALCULATOR))}>
          Volver a la calculadora
        </button>
      </div>
    </div>
  );
};

Record.propTypes = {
  operations: arrayOf(elementType)
};

Record.propTypes = {};

export default Record;
