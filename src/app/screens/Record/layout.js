import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { arrayOf, elementType } from 'prop-types';

import OperationActions from 'redux/operations/actions';

import styles from './styles.module.scss';

const RecordLayout = ({ operations }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.recordTitle}>Historial</div>
      <div className={styles.operations}>{operations}</div>
      <div className={styles.recordButtons}>
        <button className={styles.clear} onClick={() => dispatch(OperationActions.removeAllOperations())}>
          Limpiar
        </button>
        <button className={styles.recToCalcButton} onClick={() => dispatch(push('/'))}>
          Volver a la calculadora
        </button>
      </div>
    </div>
  );
};

RecordLayout.propTypes = {
  operations: arrayOf(elementType)
};

RecordLayout.propTypes = {};

export default RecordLayout;
