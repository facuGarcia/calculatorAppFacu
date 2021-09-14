import { createTypes, completeTypes } from 'redux-recompose';

export const actions = createTypes(completeTypes([], ['ADD_OPERATION', 'GET_OPERATIONS']), '@@OPERATIONS');

export const actionCreators = {
  addOperation: operation => async dispatch => dispatch({ type: actions.ADD_OPERATION, payload: operation }),
  getOperations: () => async dispatch => dispatch({ type: actions.GET_OPERATIONS })
};

export default actionCreators;
