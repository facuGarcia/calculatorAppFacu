import { createTypes, completeTypes } from 'redux-recompose';

export const actions = createTypes(
  completeTypes([], ['ADD_OPERATION', 'REMOVE_OPERATION', 'REMOVE_ALL_OPERATIONS']),
  '@@OPERATIONS'
);

export const actionCreators = {
  addOperation: operation => async dispatch => dispatch({ type: actions.ADD_OPERATION, payload: operation }),
  removeOperation: operation => async dispatch =>
    dispatch({ type: actions.REMOVE_OPERATION, payload: operation }),
  removeAllOperations: () => async dispatch => dispatch({ type: actions.REMOVE_ALL_OPERATIONS })
};

export default actionCreators;
