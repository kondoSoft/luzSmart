import type { Action } from '../actions/types';
import { SET_USER, LOGOUT, PRINT_USER } from '../actions/user';

import {REHYDRATE} from 'redux-persist/constants'

export type State = {
    name: string
}

const initialState = {
  token: '',
  loginError: '',
  noPassword: '',
};

export default function (state:State = initialState, action:Action): State {

  if (action.type === SET_USER) {
    return {
      ...state,
      token: action.payload.key,
      noPassword: (action.payload.password) && action.payload.password.toString(),
      loginError: (action.payload.non_field_errors) && action.payload.non_field_errors.toString(),
    };
  }
  // else if (action.type === REHYDRATE){
  //   var incoming = action.payload.user
  //   console.log('token' ,incoming);
  //   if (incoming.token) return {...state, ...incoming}
  //   return state
  // }
  else if(action.type === LOGOUT){
    return {
      ...state,
      token: '',
    }
  }
  if (action.type === PRINT_USER) {
    return{
      ...state,
      user:action.payload
    }
  }
  return state;
}
