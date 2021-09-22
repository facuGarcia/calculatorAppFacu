export const submitForm = values => {
  let valid = true;
  ['name', 'input', 'phone'].forEach(field => {
    if (!values[field]) valid = false;
  });

  if (valid) {
    console.log('todo piola');
  } else {
    console.log('super malardo bros');
  }
};
