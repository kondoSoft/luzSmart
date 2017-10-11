import type { Action } from './types';
import { getContract } from './list_states_mx';


const endPoint = 'http://138.68.49.119:8080';
// const endPoint = 'http://127.0.0.1:8000';



export const PRINT_RATE_PERIOD = 'PRINT_RATE_PERIOD';
export const PRINT_RECEIPTS = 'PRINT_RECEIPTS';
export const PICKER_CONTRACT = 'PICKER_CONTRACT';
export const RESET_PICKER = 'RESET_PICKER';

export function printRatePeriod(data):Action {
  return {
    type: PRINT_RATE_PERIOD,
    payload: data,
  };
}
export function printReceipts(data):Action {
  return {
    type: PRINT_RECEIPTS,
    payload: data,
  };
}

export function pickerContract(data):Action {
  return {
    type: PICKER_CONTRACT,
    payload: data,
  }
}
export function resetPicketContract():Action{
  return {
    type: RESET_PICKER,
  }
}
export function postReceipt(list, token):Action{
  return dispatch => {
    return fetch(endPoint+'/receipt/',{
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Token ' + token
     },
     body: JSON.stringify({
        payday_limit: list.payday_limit,
        amount_payable: list.amount_payable,
        current_reading: list.current_reading,
        current_reading_updated: list.current_reading,
        previous_reading: list.previous_reading,
        contract: list.contract_id,
        period: list.period,
        status: list.status,
      })
    })
    .then(res => {return res.json()})
    .catch(err => console.log(err))
  }
}
export function postProjectReceipt(list, token):Action{
  return dispatch => {
    return fetch(endPoint+'/receipt/',{
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Token ' + token
     },
     body: JSON.stringify({
        payday_limit: list.payday_limit,
        amount_payable: 0,
        current_reading: list.current_reading,
        current_reading_updated: list.current_reading,
        previous_reading: list.current_reading,
        contract: list.contract_id,
        period: list.period,
        // status: list.status,
      })
    })
    .then(res => {return res.json()})
    .catch(err => console.log(err))
  }
}
export function postRecord(list, token):Action{
  return dispatch => {
    return fetch(endPoint+'/records/',{
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Token ' + token
     },
     body: JSON.stringify({
        date: list.record.date,
        day: list.record.day,
        daily_reading: list.record.daily_reading,
        hours_elapsed: list.record.hours_elapsed,
        hours_totals: list.record.hours_totals,
        days_elapsed: list.record.days_elapsed,
        days_totals: list.record.days_totals,
        daily_consumption: list.record.daily_consumption,
        cumulative_consumption: list.record.cumulative_consumption,
        actual_consumption: list.record.actual_consumption,
        average_global: list.record.average_global,
        rest_day: list.record.rest_day,
        projection: list.record.projection,
        contracts: list.contract_id,
      })
    })
    .then(res => {return res.json()})
    .then(res => {console.log('res2',res)})
    .catch(err => console.log(err))
  }
}

export function patchReceipt(data, token, id,navigation):Action{
  return dispatch => {
    return fetch(endPoint+'/receipt/'+ id + '/',{
      method: 'PATCH',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Token '+token
      },
      body: JSON.stringify({
        current_reading_updated: data
      })
    })
    .then(res => {return res.json()})
    .then(res=> {dispatch(getContract(token,navigation))
    })
    .catch(err => console.log(err))
  }
}

export function getRatePeriod(rate, token):Action{
  return dispatch=>{
    return fetch(endPoint+'/rate_period/?' + 'rate=' + rate,{
      method: 'GET',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Token '+token
      },
    })
    .then(res => {return res.json()})
    .then(res=> dispatch(printRatePeriod(res)))
    .catch(err => console.log(err))
  }
}
