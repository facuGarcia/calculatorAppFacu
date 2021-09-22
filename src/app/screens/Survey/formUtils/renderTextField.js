import React from 'react';
import { TextField } from '@widergy/energy-ui/node_modules/@material-ui/core';

import styles from '../styles.module.scss';

// eslint-disable-next-line react/prop-types
const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    classes={{ root: styles.formField }}
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    fullWidth
    {...input}
    {...custom}
    multiline
    color="primary"
  />
);

export default renderTextField;
