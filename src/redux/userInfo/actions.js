import { createTypes, completeTypes } from 'redux-recompose';

import OperationsService from 'services/OperationsService';
import { actionCreators as messageActions } from 'redux/message/actions';

export const actions = createTypes(completeTypes([], ['UPDATE_USER_INFO']), '@@USER_INFO');

export const actionCreators = {
  surveySubmit: values => async dispatch => {
    dispatch(actionCreators.saveUser(values));
    dispatch(messageActions.useMethod(OperationsService.sendSurvey, { input_values: values }));
  },
  saveUser: values => async dispatch => dispatch({ type: actions.UPDATE_USER_INFO, payload: values })
};

export default actionCreators;
