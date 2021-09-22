/* eslint-disable react/prop-types */
import React from 'react';
import { Field, reduxForm, submit } from 'redux-form';
import { TextField } from '@widergy/energy-ui/node_modules/@material-ui/core';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import styles from './styles.module.scss';
import { normalizePhone, normalizeName } from './form/normalize.js';
import { validate } from './form/validate';
import { submitForm } from './form/submit';

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    classes={{ root: styles.formField, multiline: true }}
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const SurveyLayout = ({ handleSubmit }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.surveyTitle}>Encuesta</div>
      <form id="surveyForm" classes={{ root: styles.formContainer }} onSubmit={handleSubmit(submitForm)}>
        <div className={styles.formContainer}>
          <div>
            <div>
              <Field name="name" component={renderTextField} label="Nombre" normalize={normalizeName} />
            </div>
            <div>
              <Field name="input" component={renderTextField} label="Devolución" />
            </div>
            <div>
              <Field name="phone" component={renderTextField} label="Teléfono" normalize={normalizePhone} />
            </div>
          </div>
        </div>
      </form>
      <div className={styles.surveyButtons}>
        <button className={styles.submitButton} type="submit" form="surveyForm">
          Enviar
        </button>
        <button className={styles.survToCalcButton} onClick={() => dispatch(push('/'))}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'surveyForm',
  validate
})(SurveyLayout);
