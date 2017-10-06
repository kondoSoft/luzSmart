import type { Action } from '../actions/types';
import { SET_USER, LOGOUT, PRINT_USER, GET_DATA_USER, PRINT_REGISTER_USER, EMAIL_VERIFICATION } from '../actions/user';

import {REHYDRATE} from 'redux-persist/constants'

export type State = {
    name: string
}

const initialState = {
  token: '',
  loginError: '',
  noPassword: '',
  user: '',
  profileUser: '',
  createAccountValidation: '',

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
      user:action.payload,
      profileUser: action.profile.results[0]
    }
  }
  if (action.type === PRINT_REGISTER_USER) {
    return {
      ...state,
      createAccountValidation: action.payload
    }
  }
  if (action.type === EMAIL_VERIFICATION) {
    return {
      ...state,
      emailVerification: action.payload
    }
  }
  // else if (action.type === REHYDRATE){
  //     var incoming = action.payload
  //     var profile = action.profile
  //     console.log('incoming', incoming, 'profile', profile);
  //     if (incoming.user) return {...state, ...incoming}
  //     return state
  // }
  return state;
}
