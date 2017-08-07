import type { Action } from './types';

const endPoint = 'http://192.168.1.69:8080';


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
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
}
