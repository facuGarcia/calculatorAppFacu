import React from 'react';
import { string, arrayOf, elementType } from 'prop-types';

import styles from './styles.module.scss';

const CalculatorLayout = ({ result, digits, calc, operators }) => (
  <div>
    <div className={styles.calculatorDisplay}>
      {result ? <div className={styles.result}>{result}</div> : ''}
      <div>{calc || 0}</div>
    </div>
    <div className={styles.buttons}>
      <div className={styles.digits}> {digits}</div>
      <div className={styles.operators}>{operators}</div>
    </div>
  </div>
);

CalculatorLayout.propTypes = {
  result: string,
  calc: string,
  digits: arrayOf(elementType),
  operators: arrayOf(elementType)
};

export default CalculatorLayout;
