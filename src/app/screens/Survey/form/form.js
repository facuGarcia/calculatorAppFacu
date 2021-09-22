import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField } from '@widergy/energy-ui/node_modules/@material-ui/core';

import styles from '../styles.module.scss';

import { normalizePhone, normalizeName } from './normalize.js';

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

const SurveyForm = () => {
  return (
    <form classes={{ root: styles.formContainer }} className={styles.form}>
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
  );
};

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
