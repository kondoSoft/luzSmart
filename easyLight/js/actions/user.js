
import type { Action } from './types';

const endPoint = 'http://192.168.1.64:8080';

export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

export function setUser(token:string):Action {
  return {
    type: SET_USER,
    payload: token,
  };
}
function resetToken(logout):Action {
  return {
    type: LOGOUT,
  }
}
export function loginUser(email:email, password:password, navigate):Action {
  console.log(navigate);
  return dispatch => {
    return fetch(endPoint+'/rest-auth/login/',{
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',

     },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(res => {return res.json()})
    .then(token => {
      console.log(token);
      if(!token.non_field_errors){
        navigate.navigate("Contracts")
      }
      dispatch(setUser(token))})
    .catch(err => console.log(err))
  }
}

export function registerUser(data):Action{
  console.log(data);
  return dispatch=>{
    return fetch(endPoint+'/rest-auth/registration/',{
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       email: data.email,
       password1: data.password1,
       password2: data.password2,
      //  email:
     })
    })
    .then(res=> {return res.json()})
    .catch(err => console.log(err))
  }
}
export function logoutUser():Action{
  return dispatch=>{
    return fetch(endPoint+'/rest-auth/logout/',{
      method: 'POST',
    })
    .then(res => dispatch(resetToken()))
    .catch(err => console.log(err))
  }
}
