export const validate = values => {
  const errors = {};
  const requiredFields = ['name', 'input', 'phone'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Campo obligatorio';
    }
  });
  return errors;
};
