
import type { Action } from './types';

const endPoint = 'http://192.168.1.68:8080';

export const SET_USER = 'SET_USER';

export function setUser(token:string):Action {
  return {
    type: SET_USER,
    payload: token,
  };
}

export function loginUser(email: email, password: password):Action {
  var statusCode
  return dispatch => {
    return fetch(endPoint+'/get_auth_token/',{
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',

     },
      body: JSON.stringify({
        username: email,
        password: password,
      })
    })
    .then(res => {return res.json()})
    .then(token => {dispatch(setUser(token))})
    .catch(err => console.log(err))
  }
}
