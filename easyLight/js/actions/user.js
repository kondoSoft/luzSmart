
import type { Action } from './types';

const endPoint = 'http://138.68.49.119:8080';
// const endPoint = 'http://127.0.0.1:8000';


export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const PRINT_USER = 'PRINT_USER'
export const GET_DATA_USER = 'GET_DATA_USER'

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
function printUser(user, profile):Action {
  return{
    type: PRINT_USER,
    payload: user,
    profile: profile
  }
}

export function getProfile(user, token):Action {
  return dispatch => {
    return fetch(endPoint+'/user/profile/?user_id='+ user.pk,{
      method: 'GET',
      headers:{
        'Authorization': 'Token '+token,
      }
    })
    .then(res => {return res.json()})
    .then(res => dispatch(printUser(user, res)))
    .catch(err => console.log(err))
  }
}

export function getUser(token):Action {
  return dispatch => {
    return fetch(endPoint+'/rest-auth/user/',{
      method: 'GET',
      headers:{
        'Authorization': 'Token '+token,
      }
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log('getuser', res);
      dispatch(getProfile(res, token))})
    .catch(err => console.log(err))
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
        navigate.navigate("Contratos")
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
    if(list.birth_date != ''){
      data.append('birth_date', list.birth_date,)
    }
    data.append('zip_code', list.zip_code)
    if(list.file != null){
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
    .then(res=> { return res.json() })
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
export function updateProfile(data, token):Action{
  console.log('data>>>>', data);
  return dispatch => {
    const formData = new FormData();
    if(data.file != undefined){
      formData.append('avatar', {
        uri: data.file.uri,
        type: 'image/png',
        name: data.file.fileName,
      })
    }
    return fetch(endPoint+'/user/profile/'+ data.user.pk + '/', {
      method:'PUT',
      headers:{
        'Accept': 'application/json',
        'Authorization': 'Token '+ token
      },
      body: formData
    })
    .then(res => {return res.json()})
    .catch(err => console.error(err))
  }
}
export function updateUser(data, token):Action{
  return dispatch => {
    const form = new FormData();
    form.append('first_name', data.user.first_name)
    form.append('last_name', data.user.last_name)
    form.append('email', data.user.email)
    form.append('username', data.user.username)
    const fetchOptions = {
      method:'PUT',
      headers:{
        'Accept': 'application/json',
        'Authorization': 'Token '+ token
      },
      body: form
    }

    return fetch(endPoint+'/rest-auth/user/', fetchOptions)
    .then(res => {return res.json()})
    .then(res => {dispatch(updateProfile(data, token))})
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
    .catch(err => console.error(err))
  }
}
export function contactMessage(subject,message,user):Action {
  return dispatch => {
    const data = new FormData();
    data.append('name',user.first_name)
    data.append('email',user.email)
    data.append('message',message)
    data.append('subject',subject)

    return fetch(endPoint+'/contact/',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
     },
     body: data
    })
    .then(res=> { return res.json() })
    .then(res => { return res })
    .catch(err => console.log(err))
  }
}
