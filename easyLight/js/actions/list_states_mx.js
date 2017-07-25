import type { Action } from './types';

export const GET_STATES = 'GET_STATES';
export const GET_MUNICIPALITY = 'GET_MUNICIPALITY';
export const RESET_MUNICIPALITY = 'RESET_MUNICIPALITY'

export function printStates(list):Action{
  return {
    type: GET_STATES,
    payload: list.results,
  }
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

export function getStates(list):Action {
  return dispatch => {
    return fetch ('http://192.168.1.75:8080/states', {
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
    return fetch ('http://192.168.1.75:8080/municipality/?state_id=' + state_id, {
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
