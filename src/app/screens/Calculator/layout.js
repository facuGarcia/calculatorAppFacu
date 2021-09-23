import React from 'react';
import { string, arrayOf, elementType } from 'prop-types';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import styles from './styles.module.scss';

const Calculator = ({ result, digits, calc, operators }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.calculatorDisplay}>
        {result ? <div className={styles.result}>{result}</div> : ''}
        <div>{calc || 0}</div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.digits}> {digits}</div>
        <div className={styles.operators}>{operators}</div>
      </div>
      <div className={styles.calcButtons}>
        <button className={styles.calcToRecButton} onClick={() => dispatch(push('/record'))}>
          Ver el historial
        </button>
        <button className={styles.calcToSurvcButton} onClick={() => dispatch(push('/survey'))}>
          Ir a la encuesta
        </button>
      </div>
    </div>
  );
};
Calculator.propTypes = {
  result: string,
  calc: string,
  digits: arrayOf(elementType),
  operators: arrayOf(elementType)
};

export default Calculator;
