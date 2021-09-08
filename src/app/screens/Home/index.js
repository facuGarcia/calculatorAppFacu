/* eslint-disable no-eval */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Calculator from './layout';
import { Digits, Other, Operators, SynErr } from './constants.js';
import styles from './styles.module.scss';

const Home = () => {
  const [calc, setCalc] = useState('');
  const calcRef = useRef(calc);
  calcRef.current = calc;

  const [result, setResult] = useState('');
  const resultRef = useRef(result);
  resultRef.current = result;

  const [isValid, setIsValid] = useState(false);
  const isValidRef = useRef(isValid);
  isValidRef.current = isValid;

  const [didCommit, setDidCommit] = useState(false);
  const didCommitRef = useRef(didCommit);
  didCommitRef.current = didCommit;

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
    if (!didCommitRef.current) {
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
    console.log(e)
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
      <Calculator result={result} calc={calc} digits={generateDigits()} operators={generateOperators()} />
    </div>
  );
};

export default connect()(Home);
