/* eslint-disable react/prop-types */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@widergy/energy-ui/node_modules/@material-ui/core';

import colors from 'config/someCustomer/scss/_colors.scss';

import styles from './styles.module.scss';
import { normalizePhone, normalizeName } from './formUtils/normalize.js';
import { validate } from './formUtils/validate';
import { cancelForm, submitForm } from './formUtils/submit';
import renderTextField from './formUtils/renderTextField';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.black
    }
  }
});

const SurveyLayout = ({ handleSubmit }) => (
  <div>
    <div className={styles.surveyTitle}>Encuesta</div>
    <MuiThemeProvider theme={theme}>
      <form
        id="surveyForm"
        classes={{ root: styles.formContainer }}
        onSubmit={handleSubmit(values => submitForm({ values }))}
      >
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
    </MuiThemeProvider>
    <div className={styles.surveyButtons}>
      <button className={styles.submitButton} type="submit" form="surveyForm">
        Enviar
      </button>
      <button className={styles.survToCalcButton} onMouseDown={() => cancelForm()}>
        Cancelar
      </button>
    </div>
  </div>
);

export default connect(state => ({ initialValues: state.userInfoReducer.userInfo }))(
  reduxForm({
    form: 'surveyForm',
    validate
  })(SurveyLayout)
);
