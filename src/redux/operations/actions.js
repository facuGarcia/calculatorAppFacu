import { createTypes, completeTypes } from 'redux-recompose';

import OperationsService from 'services/OperationsService';

export const actions = createTypes(
  completeTypes(
    ['FETCH_OPERATIONS'],
    ['ADD_OPERATION', 'REMOVE_OPERATION', 'REMOVE_ALL_OPERATIONS', 'MODIFY_OPERATION']
  ),
  '@@OPERATIONS'
);

const privateActionCreators = {
  fetchOperationsSuccess: data => ({
    type: actions.FETCH_OPERATIONS_SUCCESS,
    payload: data,
    target: 'operationsRecord'
  }),
  fetchOperationsFailure: error => ({
    type: actions.FETCH_OPERATIONS_FAILURE,
    payload: error,
    target: 'operationsRecord'
  })
};

export const actionCreators = {
  fetchOperations: () => async dispatch => {
    dispatch({ type: actions.FETCH_OPERATIONS, target: 'operationsRecord' });
    const response = await OperationsService.getOperations();
    console.log(response)
    if (response.ok) {
      dispatch(privateActionCreators.fetchOperationsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.fetchOperationsFailure(response.error));
    }
  },
  addOperation: operation => async dispatch => dispatch({ type: actions.ADD_OPERATION, payload: operation }),
  removeOperation: operation => async dispatch =>
    dispatch({ type: actions.REMOVE_OPERATION, payload: operation }),
  removeAllOperations: () => async dispatch => dispatch({ type: actions.REMOVE_ALL_OPERATIONS }),
  modifyOperation: (id, newExpression) => async dispatch =>
    dispatch({ type: actions.MODIFY_OPERATION, payload: { id, newExpression } })
};

export default actionCreators;

// fetchOperations: () => async dispatch => dispatch({ type: actions.FETCH_OPERATIONS }),
