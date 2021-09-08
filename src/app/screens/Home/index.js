/* eslint-disable no-eval */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Calculator from './layout';
import { Digits, Other, Operators, SynErr } from './constants.js';
import styles from './styles.module.scss';

const Home = () => {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [didCommit, setDidCommit] = useState(false);

  const operatorsNotMinus = Operators.filter(op => op !== '-');

  const updateCalc = input => {
    let auxCalc = calc;
    if (calc === SynErr) auxCalc = '';
    if (
      !(operatorsNotMinus.includes(input) && (auxCalc === '' || Operators.includes(auxCalc.slice(-1)))) &&
      !(input === '-' && auxCalc.slice(-1) === '-') &&
      !(input === '0' && auxCalc === '') &&
      !(input === '0' && auxCalc.slice(-1) === '0' && Operators.includes(auxCalc.slice(-2, -1)))
    ) {
      setCalc(
        auxCalc === '0' || (auxCalc.slice(-1) === '0' && Operators.includes(auxCalc.slice(-2, -1)))
          ? auxCalc.slice(0, -1) + input
          : auxCalc + input
      );
    }
  };

  useEffect(() => {
    if (!didCommit) {
      try {
        setResult(
          Operators.includes(calc.slice(-1)) ? eval(calc.slice(0, -1)).toString() : eval(calc).toString()
        );
        setIsValid(true);
      } catch {
        setIsValid(false);
      }
    } else {
      setResult('');
      setDidCommit(false);
    }
  }, [calc]);

  const commitResult = () => {
    if (result === '' && isValid) return;
    if (result !== calc) {
      setDidCommit(true);
    } else setResult('');
    setCalc(isValid ? result : SynErr);
  };

  const deleteLast = () => {
    if (calc !== '') setCalc(calc.slice(0, -1));
  };

  const deleteAll = () => {
    setCalc('');
    setResult('');
  };

  const generateDigits = () => {
    const digits = [];
    digits.push(<button onClick={() => deleteAll()}>AC</button>);
    digits.push(<button onClick={() => deleteLast()}>DEL</button>);
    Digits.forEach(dig => digits.push(<button onClick={() => updateCalc(dig.toString())}>{dig}</button>));
    Other.forEach(dig => digits.push(<button onClick={() => updateCalc(dig.toString())}>{dig}</button>));
    return digits;
  };
  const generateOperators = () => {
    const operators = [];
    Operators.forEach(op => operators.push(<button onClick={() => updateCalc(op.toString())}>{op}</button>));
    operators.push(<button onClick={() => commitResult()}>=</button>);
    return operators;
  };

  return (
    <div className={styles.container}>
      <Calculator result={result} calc={calc} digits={generateDigits()} operators={generateOperators()} />
    </div>
  );
};

export default connect()(Home);
