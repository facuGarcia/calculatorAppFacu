import React from 'react';

import styles from './styles.module.scss';

const Calculator = props => (
  <div>
    <div className={styles.calculatorDisplay}>
      {props.result ? <div className={styles.result}>{props.result}</div> : ''}
      <div>{props.calc || 0}</div>
    </div>
    <div className={styles.buttons}>
      <div className={styles.digits}> {props.digits}</div>
      <div className={styles.operators}>{props.operators}</div>
    </div>
  </div>
);

export default Calculator;