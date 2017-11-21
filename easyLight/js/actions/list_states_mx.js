import type { Action } from './types';

export const GET_STATES = 'GET_STATES';
export const GET_MUNICIPALITY = 'GET_MUNICIPALITY';
export const RESET_MUNICIPALITY = 'RESET_MUNICIPALITY'
export const RESET_RATE = 'RESET_RATE'
export const GET_RATE = 'GET_RATE'
export const SET_INDEX = 'SET_INDEX';
export const GET_CONTRACT = 'GET_CONTRACT'
export const GET_TIPS = 'GET_TIPS'
export const SUCCES_CONTRACT = 'SUCCES_CONTRACT'

// const endPoint = 'http://138.68.49.119:8080';
const endPoint = 'http://127.0.0.1:8000';



export function printStates(list):Action{
  return {
    type: GET_STATES,
    payload: list.results,
  }
}

export function setIndex(index:number):Action {
  return {
    type: SET_INDEX,
    payload: index,
  };
}

export function printMunicipality(list):Action{
  return {
    type: GET_MUNICIPALITY,
    payload: list,
  }
}
export function resetMunicipality():Action{
  return {
    type: RESET_MUNICIPALITY,
  }
}
export function resetRate():Action{
  return {
    type: RESET_RATE
  }
}
export function printRate(list):Action {
  return {
    type: GET_RATE,
    payload: list.results
  }
}
export function printContract(list):Action {
  return {
    type: GET_CONTRACT,
    payload: list
  }
}
export function successContract(list):Action {
  return {
    type: SUCCES_CONTRACT,
    payload: list
  }
}

export function printTips(list):Action {
  return {
    type: GET_TIPS,
    payload: list
  }
}

export function getStates():Action {
  return dispatch => {
    return fetch (endPoint+'/states/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => {return res.json()})
    .then(res=> dispatch(printStates(res)))
    .catch(err => console.log(err))
  };
}

export function getMunicipality(state_id):Action{
  return dispatch => {
    return fetch (endPoint+'/municipality/?state_id=' + state_id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => {return res.json()})
    .then(res=> {
      dispatch(printMunicipality(res)) })
    .catch(err => console.log(err))
  }
}
export function getRate(mun_id, token):Action{
  return dispatch => {
    return fetch (endPoint+'/rate_unique/?mun_id=' + mun_id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+token
      }
    })
    .then(res => {return res.json()})
    .then(res=> dispatch(printRate(res)))
    .catch(err => console.log(err))
  }
}

export function postContract(list, rate, token):Action{

  return dispatch => {
    const data = new FormData();
    data.append('name_contract', list.name)
    data.append('number_contract', list.number_contract)
    data.append('state', list.state)
    data.append('municipality', list.municipality)
    data.append('rate', rate)
    data.append('initialDateRange', list.initialDateRange)
    data.append('finalDateRange', list.finalDateRange)
    data.append('type_payment', list.type_payment)
    data.append('high_consumption', list.checkDAC)
    data.append('owner', list.user.pk)
    if(list.file != undefined){
      data.append('image',{
        uri: list.file.uri,
        type: 'image/png',
        name: list.file.fileName
      })
    }else {

    }
    return fetch(endPoint+'/contract/',{
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
       'Authorization': 'Token '+token
     },
     body: data
    })
    .then(res => {
      return res.json()
    })
    .then(json => dispatch(successContract(json)))
    .catch(err => console.log(err))
  }
}
export function getContract(token, navigate):Action{
  return dispatch => {
    return fetch (endPoint+'/contract/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Token '+ token
      }
    })
    .then(res => {return res.json()})
    .then(res=> {
      dispatch(printContract(res))
      if(!token.non_field_errors && navigate.state.routeName != 'Medicion' && navigate.state.routeName != 'Mediciones' && navigate.state.routeName != 'MedicionPeriodo'){
        navigate.navigate('Contratos')
        console.log('navega');
      }
    })
    .catch(err => console.log(err))
  }
}

export function deleteContract(id, token, navigation):Action{
  return dispatch => {
    return fetch(endPoint+'/contract/'+ id +'/', {
      method: 'DELETE',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Token '+ token
      }
    })
    .then(res => { dispatch(getContract(token, navigation)) })
    .catch(err => console.log(err))
  }
}

export function getTips(token):Action{
  return dispatch => {
    return fetch(endPoint + '/tips/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Token ' + token,
      }
    })
    .then(res => {return res.json()})
    .then(res => {dispatch(printTips(res))})
    .catch(err => console.log(err))
  }
}



export function updateContract(data, token, id, navigation) {
  return dispatch => {
    var formData = new FormData();
    formData.append('name_contract', data.name)
    formData.append('contract_id', data.contract_id)
    formData.append('rate', data.rate)
    formData.append('type_payment', data.type_payment)
    formData.append('municipality', data.municipality_id)
    formData.append('state', data.state_id)
    formData.append('number_contract', data.number_contract)
    if(data.file != undefined || data.file != null){
      formData.append('image',{
        uri: data.file.uri,
        type: 'image/png',
        name: data.file.fileName
      })
    }
    var fetchOptions = {
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Token ' + token,
      },
      body:formData
    }

    fetch(endPoint+'/contract/'+id+'/', fetchOptions)
    .then(res => {return res.json()})
    .then(res => {
      dispatch(getContract(token, navigation))})
    .catch(err => console.error(err))
  }
}
