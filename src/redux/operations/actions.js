import { createTypes, completeTypes } from 'redux-recompose';

import OperationsService from 'services/OperationsService';
import Operation from 'utils/operationClass';
import { actionCreators as messageActions } from 'redux/message/actions';

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
    if (response.ok) {
      dispatch(privateActionCreators.fetchOperationsSuccess(response.data));
    } else {
      dispatch(privateActionCreators.fetchOperationsFailure(response.error));
    }
  },
  addOperation: operation => async dispatch => {
    dispatch({ type: actions.ADD_OPERATION, payload: operation });
    dispatch(messageActions.useMethod(OperationsService.postOperations, operation));
  },
  removeOperation: operationId => async dispatch => {
    dispatch({ type: actions.REMOVE_OPERATION, payload: operationId });
    dispatch(messageActions.useMethod(OperationsService.deleteOperations, operationId));
  },
  removeAllOperations: () => async dispatch => {
    dispatch({ type: actions.REMOVE_ALL_OPERATIONS });
    dispatch(messageActions.useMethod(OperationsService.deleteOperations, -1));
  },
  modifyOperation: (id, newExpression) => async dispatch => {
    dispatch({ type: actions.MODIFY_OPERATION, payload: { id, newExpression } });
    dispatch(messageActions.useMethod(OperationsService.putOperations, new Operation(id, newExpression)));
  }
};

export default actionCreators;

// fetchOperations: () => async dispatch => dispatch({ type: actions.FETCH_OPERATIONS }),
