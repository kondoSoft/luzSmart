import type { Action } from '../actions/types';
import { SET_USER, LOGOUT, PRINT_USER, GET_DATA_USER } from '../actions/user';

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
  if (action.type === GET_DATA_USER) {
    return{
      ...state,
      userData: action.payload,
    }
  }
  else if (action.type === REHYDRATE){
      var incoming = action.payload
      console.log('token' ,incoming);
      if (incoming.userData) return {...state, ...incoming}
      return state
  }
  return state;
}
