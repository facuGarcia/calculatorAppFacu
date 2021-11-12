import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  messageDisplayed: {
    message: 'Bienvenido'
  }
};

const reducerDescription = {
  primaryActions: [actions.USE_METHOD],
  override: {
    [actions.CLEAR_MESSAGE]: state => Immutable.merge(state, { messageDisplayed: { message: '' } })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
