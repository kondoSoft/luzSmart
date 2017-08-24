import type { Action } from './types';
import { getContract } from './list_states_mx'
// const endPoint = 'http://138.68.49.119:8080';
const endPoint = 'http://127.0.0.1:8000';

export function postReceipt(list):Action{
  return dispatch => {
    return fetch(endPoint+'/receipt/',{
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
        payday_limit: list.payday_limit,
        amount_payable: list.amount_payable,
        current_reading: list.current_reading,
        previous_reading: list.previous_reading,
        contract: list.contract_id,
      })
    })
    .then(res => {return res.json()})
    .catch(err => console.log(err))
  }
}

export function patchReceipt(data, token, id):Action{
  return dispatch => {
    return fetch(endPoint+'/receipt/'+ id + '/',{
      method: 'PATCH',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Token '+token
      },
      body: JSON.stringify({
        current_data: data
      })
    })
    .then(res => {return res.json()})
    .then(res=>{
      console.log(token);
      dispatch(getContract(token))})
    .catch(err => console.log(err))
  }
}
