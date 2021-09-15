import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import Operation from 'utils/operationClass';

import { actions } from './actions';

export const defaultState = {
  operations: [],
  currentIndex: 0
};

const reducerDescription = {
  primaryActions: [actions.ADD_OPERATION, actions.REMOVE_OPERATION],
  override: {
    [actions.ADD_OPERATION]: (state, action) =>
      Immutable.merge(state, {
        operations: state.operations.concat(new Operation(state.currentIndex, action.payload)),
        currentIndex: state.currentIndex + 1
      }),
    [actions.REMOVE_OPERATION]: (state, action) =>
      Immutable.merge(state, {
        operations: state.operations.filter(operation => operation.index !== action.payload)
      }),
    [actions.REMOVE_ALL_OPERATIONS]: state => Immutable.merge(state, { operations: defaultState.operations }),
    [actions.MODIFY_OPERATION]: (state, action) =>
      Immutable.merge(state, {
        operations: state.operations.map(operation =>
          operation.index !== action.payload.index
            ? operation
            : new Operation(action.payload.index, action.payload.newExpression)
        )
      })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
