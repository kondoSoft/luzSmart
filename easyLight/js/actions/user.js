
import type { Action } from './types';

const endPoint = 'http://138.68.49.119:8080';
// const endPoint = 'http://127.0.0.1:8000';



export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const PRINT_USER = 'PRINT_USER'

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
function printUser(user):Action {
  return{
    type: PRINT_USER,
    payload: user,
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
    .then(res => { return res.json() })
    .then(token => {
      // console.log(token);
      dispatch(setUser(token))
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
    if(list.file != undefined){
      data.append('avatar',{
        uri: list.file.uri,
        type: 'image/png',
        name: list.file.fileName
      })
    }
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

export function editUser(token):Action{
  return dispatch => {
    return fetch(endPoint+'/rest-auth/user/', {
      method:'GET',
      headers:{
        'Authorization': 'Token '+token
      }
    })
    .then(res => {return res.json()})
    .then(res => dispatch(printUser(res)))
    .catch(err => console.log(err))
  }
}

export function updateUser(user, token):Action{
  return dispatch => {
    const data = new FormData();
    data.append('first_name', user.first_name)
    data.append('last_name', user.last_name)
    data.append('email', user.email)
    data.append('username', user.username)

    // if(user.file != undefined){
    //   data.append('avatar',{
    //     uri: user.file.uri,
    //     type: 'image/png',
    //     name: user.file.fileName
    //   })
    // }
    const fetchOptions = {
      method:'PUT',
      headers:{
        'Accept': 'application/json',
        'Authorization': 'Token '+ token
      },
      body: data
    }

    return fetch(endPoint+'/rest-auth/user/', fetchOptions)
    .then(res => {return res.json()})
    .then(res => {return console.log(res)})
    .catch(err => console.error(err))
  }
}

export function changePassword(data, token):Action {
  return dispatch => {
    const formData = new FormData();
    formData.append('old_password', data.oldPassword)
    formData.append('new_password1', data.newPassword1)
    formData.append('new_password2', data.newPassword2)

    const fetchOptions = {
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Authorization': 'Token '+ token
      },
      body: formData
    }

    return fetch(endPoint+'/rest-auth/password/change/', fetchOptions)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }
}
