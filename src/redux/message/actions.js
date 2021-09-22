import { createTypes, completeTypes } from 'redux-recompose';

export const actions = createTypes(completeTypes(['USE_METHOD'], ['CLEAR_MESSAGE']), '@@MESSAGE');

const privateActionCreators = {
  useMethodSuccess: data => ({
    type: actions.USE_METHOD_SUCCESS,
    payload: data,
    target: 'messageDisplayed'
  }),
  useMethodFailure: error => ({
    type: actions.USE_METHOD_FAILURE,
    payload: error,
    target: 'messageDisplayed'
  })
};

export const actionCreators = {
  useMethod: (action, payload) => async dispatch => {
    dispatch({ type: actions.USE_METHOD, target: 'messageDisplayed' });
    const response = await action(payload);
    if (response.ok) {
      dispatch({ type: actions.CLEAR_MESSAGE });
      dispatch(privateActionCreators.useMethodSuccess(response.data));
    } else {
      dispatch(privateActionCreators.useMethodFailure(response.error));
    }
  }
};
