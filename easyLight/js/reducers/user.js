import type { Action } from '../actions/types';
import { SET_USER, LOGOUT } from '../actions/user';

import {REHYDRATE} from 'redux-persist/constants'

export type State = {
    name: string
}

const initialState = {
  token: '',
  loginError: undefined,
  noPassword: undefined,
};

export default function (state:State = initialState, action:Action): State {

  if (action.type === SET_USER) {
    console.log('token',action.payload);
    return {
      ...state,
      token: action.payload.key,
      noPassword: action.payload.password,
      loginError: action.payload.non_field_errors,
    };
  }
  else if (action.type === REHYDRATE){
    var incoming = action.payload.user.token
    if (incoming) return {...state, ...incoming}
    return state
  }
  else if(action.type === LOGOUT){
    return {
      ...state,
      token: '',
    }
  }
  return state;
}
