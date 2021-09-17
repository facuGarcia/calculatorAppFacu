/* eslint-disable no-eval */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CalculatorLayout from './layout';
import { DIGITS, SIGNS, OPERATORS, OPERATORS_NOT_MINUS, SYN_ERR } from './constants.js';
import styles from './styles.module.scss';
import useMutableState from './hooks/useMutableState';

const Calculator = () => {
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
      setCalc(isValidRef.current ? resultRef.current : SYN_ERR);
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
  }, []);

  const calculatorButtonRenderer = (action, text) => (
    <button className={styles.calculatorBotton} onClick={() => action(text)}>
      {text}
    </button>
  );

  const generateDigits = () => {
    const digits = [];
    digits.push(calculatorButtonRenderer(deleteAll, 'AC'));
    digits.push(calculatorButtonRenderer(deleteLast, 'DEL'));
    DIGITS.forEach(dig => digits.push(calculatorButtonRenderer(updateCalc, dig)));
    SIGNS.forEach(dig => digits.push(calculatorButtonRenderer(updateCalc, dig)));
    return digits;
  };
  const generateOperators = () => {
    const operators = OPERATORS.map(operator => calculatorButtonRenderer(updateCalc, operator));
    operators.push(calculatorButtonRenderer(commitResult, '='));
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
