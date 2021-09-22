import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField } from '@widergy/energy-ui/node_modules/@material-ui/core';

import styles from './styles.module.scss';
import SurveyForm from './form/form.js';

const SurveyLayout = ({ handleSubmit, pristine, reset, submitting }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.surveyTitle}>Encuesta</div>
      <SurveyForm />
      <div className={styles.surveyButtons}>
        <button className={styles.submitButton}>Enviar</button>
        <button className={styles.survToCalcButton} onClick={() => dispatch(push('/'))}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default SurveyLayout;
