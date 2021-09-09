/* eslint-disable no-eval */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Calculator from './layout';
import { Digits, Other, Operators, SynErr } from './constants.js';
import styles from './styles.module.scss';
import useMutableState from './hooks/use-mutable-state';

const Home = () => {
  const [calcRef, setCalc] = useMutableState('');
  const [resultRef, setResult] = useMutableState('');
  const [isValidRef, setIsValid] = useMutableState(false);
  const [didCommit, setDidCommit] = useState(false);

  const operatorsNotMinus = Operators.filter(op => op !== '-');

  const updateCalc = input => {
    let auxCalc = calcRef.current;
    if (auxCalc === SynErr || auxCalc === 'Infinity') auxCalc = '';
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
      if (calcRef.current === '') {
        setResult('');
      } else {
        try {
          setResult(
            Operators.includes(calcRef.current.slice(-1))
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
      setCalc(isValidRef.current ? resultRef.current : SynErr);
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
    if (Digits.includes(e.key) || Other.includes(e.key) || Operators.includes(e.key)) {
      updateCalc(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
      commitResult();
    } else if (e.key === 'Backspace') {
      deleteLast();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

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
      <Calculator
        result={resultRef.current}
        calc={calcRef.current}
        digits={generateDigits()}
        operators={generateOperators()}
      />
    </div>
  );
};

export default connect()(Home);
