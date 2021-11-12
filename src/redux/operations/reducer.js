import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import Operation from 'utils/operationClass';

import { actions } from './actions';

export const defaultState = {
  operationsRecord: {
    currentId: 0,
    operations: []
  }
};

const reducerDescription = {
  primaryActions: [actions.FETCH_OPERATIONS],
  override: {
    [actions.ADD_OPERATION]: (state, action) =>
      Immutable.merge(state, {
        operationsRecord: {
          operations: state.operationsRecord.operations.concat(
            new Operation(state.operationsRecord.currentId, action.payload)
          ),
          currentId: state.operationsRecord.currentId + 1
        }
      }),
    [actions.REMOVE_OPERATION]: (state, action) =>
      Immutable.merge(state, {
        operationsRecord: {
          operations: state.operationsRecord.operations.filter(operation => operation.id !== action.payload)
        }
      }),
    [actions.REMOVE_ALL_OPERATIONS]: state =>
      Immutable.merge(state, { operationsRecord: defaultState.operationsRecord }),
    [actions.MODIFY_OPERATION]: (state, action) =>
      Immutable.merge(state, {
        operationsRecord: {
          operations: state.operationsRecord.operations.map(operation =>
            operation.id !== action.payload.id
              ? operation
              : new Operation(action.payload.id, action.payload.newExpression)
          )
        }
      }),
    [actions.CLEAR_MESSAGE]: state => Immutable.merge(state, { messagesRecord: '' })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
