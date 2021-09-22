import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  userInfo: {}
};

const reducerDescription = {
  primaryActions: ['xd'],
  override: {
    [actions.UPDATE_USER_INFO]: (state, action) =>
      Immutable.merge(state, { userInfo: { name: action.payload.name } })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
