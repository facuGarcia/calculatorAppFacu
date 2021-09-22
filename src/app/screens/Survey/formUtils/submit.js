import { push } from 'connected-react-router';

import { actionCreators } from 'redux/userInfo/actions';
import store from 'redux/store';

export const submitForm = ({ values }) => {
  store.dispatch(actionCreators.surveySubmit(values));
  store.dispatch(push('/'));
};

export const cancelForm = () => {
  document.activeElement.blur();
  store.dispatch(actionCreators.saveUser(store.getState().form.surveyForm.values));
  store.dispatch(push('/'));
};
