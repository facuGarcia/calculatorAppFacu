import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  operations: []
};

const reducerDescription = {
  primaryActions: [actions.ADD_OPERATION],
  override: {
    [actions.ADD_OPERATION]: (state, action) =>
      Immutable.merge(state, { operations: state.operations.concat(action.payload) })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
