import React from 'react';
import { string, arrayOf, elementType } from 'prop-types';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

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

RecordLayout.propTypes = {};

export default RecordLayout;
