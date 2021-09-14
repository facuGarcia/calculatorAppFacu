import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { arrayOf, elementType } from 'prop-types';

import styles from './styles.module.scss';

const RecordLayout = ({ operations }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.recordTitle}>Historial</div>
      <div className={styles.operations}>{operations}</div>
      <button className={styles.recToCalcdButton} onClick={() => dispatch(push('/'))}>
        Volver a la calculadora
      </button>
    </div>
  );
};

RecordLayout.propTypes = {
  operations: arrayOf(elementType)
};

RecordLayout.propTypes = {};

export default RecordLayout;
