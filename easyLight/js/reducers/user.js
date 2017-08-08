
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';

import {REHYDRATE} from 'redux-persist/constants'

export type State = {
    name: string
}

const initialState = {
  token: '',
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
    return {
      ...state,
      token: action.payload.token,
    };
  }
  else if (action.type === REHYDRATE){
    var incoming = action.payload.user
    if (incoming) return {...state, ...incoming}
    return state
  }
  return state;
}
