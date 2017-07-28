import type { Action } from './types';

export const GET_STATES = 'GET_STATES';
export const GET_MUNICIPALITY = 'GET_MUNICIPALITY';
export const RESET_MUNICIPALITY = 'RESET_MUNICIPALITY'
export const GET_RATE = 'GET_RATE'
export const GET_RATE_UNIQUE = 'GET_RATE_UNIQUE'
export const SET_INDEX = 'SET_INDEX';

const endPoint = 'http://192.168.1.72:8080';


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
export function printRate(list):Action {
  return {
    type: GET_RATE,
    payload: list
  }
}
export function printRateUnique(list):Action {
  return {
    type: GET_RATE_UNIQUE,
    payload: list
  }
}

export function getStates(list):Action {
  return dispatch => {
    return fetch (endPoint+'/states', {
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
    .then(res=> dispatch(printMunicipality(res)))
    .catch(err => console.log(err))
  }
}
export function getRate(list):Action{
  return dispatch => {
    return fetch (endPoint+':8080/rate', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => {return res.json()})
    .then(res=> dispatch(printRate(res)))
    .catch(err => console.log(err))
  }
}
export function getRateUnique(list):Action{
  return dispatch => {
    return fetch (endPoint+'/rate_unique', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => {return res.json()})
    .then(res=> dispatch(printRateUnique(res)))
    .catch(err => console.log(err))
  }
}
