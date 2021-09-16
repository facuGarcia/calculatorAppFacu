/* eslint-disable no-eval */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import OperationActions from 'redux/operations/actions';

import CalculatorLayout from './layout';
import { DIGITS, SIGNS, OPERATORS, OPERATORS_NOT_MINUS, SYN_ERR } from './constants.js';
import styles from './styles.module.scss';
import useMutableState from './hooks/useMutableState';

const Calculator = ({ dispatch }) => {
  const [calcRef, setCalc] = useMutableState('');
  const [resultRef, setResult] = useMutableState('');
  const [isValidRef, setIsValid] = useMutableState(false);
  const [didCommit, setDidCommit] = useState(false);

  const updateCalc = input => {
    let auxCalc = calcRef.current;
    if (auxCalc === SYN_ERR || auxCalc === 'Infinity') auxCalc = '';
    if (
      !(OPERATORS_NOT_MINUS.includes(input) && (auxCalc === '' || OPERATORS.includes(auxCalc.slice(-1)))) &&
      !(input === '-' && auxCalc.slice(-1) === '-') &&
      !(input === '0' && auxCalc === '') &&
      !(input === '0' && auxCalc.slice(-1) === '0' && OPERATORS.includes(auxCalc.slice(-2, -1)))
    ) {
      setCalc(
        auxCalc === '0' || (auxCalc.slice(-1) === '0' && OPERATORS.includes(auxCalc.slice(-2, -1)))
          ? auxCalc.slice(0, -1) + input
          : auxCalc + input
      );
    }
  };

  useEffect(() => {
    if (!didCommit) {
      if (calcRef.current === '') {
        setResult('');
      } else {
        try {
          setResult(
            OPERATORS.includes(calcRef.current.slice(-1))
              ? eval(calcRef.current.slice(0, -1)).toString()
              : eval(calcRef.current).toString()
          );
          setIsValid(true);
        } catch {
          setIsValid(false);
        }
      }
    } else {
      setResult('');
      setDidCommit(false);
    }
  }, [calcRef.current]);

  const commitResult = () => {
    if (resultRef.current === '' && isValidRef.current) return;
    if (resultRef.current !== calcRef.current) {
      setDidCommit(true);
      if (isValidRef.current) {
        dispatch(OperationActions.addOperation(`${calcRef.current} = ${resultRef.current}`));
        setCalc(resultRef.current);
      } else {
        setCalc(SYN_ERR);
      }
    } else setResult('');
  };

  const deleteLast = () => {
    if (calcRef.current !== '') setCalc(calcRef.current.slice(0, -1));
  };

  const deleteAll = () => {
    setCalc('');
    setResult('');
  };
  const onKeyDown = e => {
    if (DIGITS.includes(e.key) || SIGNS.includes(e.key) || OPERATORS.includes(e.key)) {
      updateCalc(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
      commitResult();
    } else if (e.key === 'Backspace') {
      deleteLast();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    dispatch(OperationActions.fetchOperations());
  }, []);

  const generateDigits = () => {
    const digits = [];
    digits.push(
      <button className={styles.calculatorBotton} onClick={() => deleteAll()}>
        AC
      </button>
    );
    digits.push(
      <button className={styles.calculatorBotton} onClick={() => deleteLast()}>
        DEL
      </button>
    );
    DIGITS.forEach(dig =>
      digits.push(
        <button className={styles.calculatorBotton} onClick={() => updateCalc(dig.toString())}>
          {dig}
        </button>
      )
    );
    SIGNS.forEach(dig =>
      digits.push(
        <button className={styles.calculatorBotton} onClick={() => updateCalc(dig.toString())}>
          {dig}
        </button>
      )
    );
    return digits;
  };
  const generateOperators = () => {
    const operators = OPERATORS.map(operator => (
      <button className={styles.calculatorBotton} onClick={() => updateCalc(operator.toString())}>
        {operator}
      </button>
    ));
    operators.push(
      <button className={styles.calculatorBotton} onClick={() => commitResult()}>
        =
      </button>
    );
    return operators;
  };

  return (
    <div className={styles.container}>
      <CalculatorLayout
        result={resultRef.current}
        calc={calcRef.current}
        digits={generateDigits()}
        operators={generateOperators()}
      />
    </div>
  );
};

export default connect()(Calculator);
