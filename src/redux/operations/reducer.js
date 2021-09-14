import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  operations: []
};

const reducerDescription = {
  primaryActions: [actions.ADD_OPERATION, actions.REMOVE_OPERATION],
  override: {
    [actions.ADD_OPERATION]: (state, action) =>
      Immutable.merge(state, {
        operations:
          state.operations.indexOf(action.payload) === -1
            ? state.operations.concat(action.payload)
            : state.operations
      }),
    [actions.REMOVE_OPERATION]: (state, action) =>
      Immutable.merge(state, {
        operations: state.operations.filter(operation => operation !== action.payload)
      }),
    [actions.REMOVE_ALL_OPERATIONS]: state => Immutable.merge(state, { operations: defaultState.operations })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
