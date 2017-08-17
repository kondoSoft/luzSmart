
import type { Action } from './types';

const endPoint = 'http://192.168.1.77:8080';

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
    .then(token => {dispatch(setUser(token))
      console.log('detail', token);
      if(!token.non_field_errors && email !== undefined){
        navigate.navigate("Contracts")
      }
    })
    .catch(err => console.log(err))
  }
}

export function registerUser(list):Action{
  return dispatch=>{
    const data = new FormData();
    data.append('first_name', list.first_name)
    data.append('last_name', list.last_name)
    data.append('email', list.email,)
    data.append('password1', list.password1,)
    data.append('password2', list.password2,)
    data.append('phone', list.phone,)
    data.append('birth_date', list.birth_date,)
    data.append('zip_code', list.zip_code)
re
    return fetch(endPoint+'/rest-auth/registration/',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
     },
     body: data
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
