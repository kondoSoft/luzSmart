import type { Action } from './types';
import { getContract } from './list_states_mx';


// const endPoint = 'http://138.68.49.119:8080';
const endPoint = 'http://127.0.0.1:8000';


export const PRINT_RECORD = 'PRINT_RECORD';
export const PRINT_RATE_PERIOD = 'PRINT_RATE_PERIOD';
export const PRINT_RECEIPTS = 'PRINT_RECEIPTS';
export const PICKER_CONTRACT = 'PICKER_CONTRACT';
export const RESET_PICKER = 'RESET_PICKER';
export const RESET_RECORD = 'RESET_RECORD';
export const PRINT_HISTORY = 'PRINT_HISTORY';

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

export function printRecord(data):Action{
  return {
    type: PRINT_RECORD,
    payload: data,
  }
}

export function resetRecord():Action{
  return {
    type: RESET_RECORD
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
    .then(res => {
      dispatch(postProjectReceipt(res, token))})
    .catch(err => console.log(err))
  }
}
export function postProjectReceipt(list, token):Action{
  let date = new Date(list.payday_limit)
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getDate();
  let dateFormat = year + '-' + month + '-' + day
  return dispatch => {
    return fetch(endPoint+'/receipt/',{
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Token ' + token
     },
     body: JSON.stringify({
        payday_limit: dateFormat,
        amount_payable: 0,
        current_reading: list.current_reading,
        current_reading_updated: list.current_reading,
        previous_reading: list.current_reading,
        contract: list.contract,
        period: list.period,
        // status: list.status,
      })
    })
    .then(res => {return res.json()})
    .catch(err => console.log(err))
  }
}
export function patchNewReceipt(data, id, token):Action{

  return dispatch => {
    return fetch(endPoint+'/receipt/'+ id + '/',{
      method: 'PATCH',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Token '+token
      },
      body: JSON.stringify({
        payday_limit: data.payday_limit,
        amount_payable: data.amount_payable,
        current_reading: data.current_reading,
        current_reading_updated: data.current_reading,
        previous_reading: data.previous_reading,
        contract: data.contract,
        period: data.period,
        status: true,

      })
    })
    .then(res => {return res.json()})
    .then(res => dispatch(postProjectReceipt(res, token)))
    .catch(err => console.log(err))
  }
}
export function postRecord(list, token):Action{
  var status;
  if(list.record.status){
    status= true
  }else{
    status= false
  }
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
        datetime: list.record.datetime,
        day: list.record.day,
        daily_reading: list.record.daily_reading,
        hours_elapsed: list.record.hours_elapsed,
        hours_totals: list.record.hours_totals,
        days_elapsed: list.record.days_elapsed,
        days_totals: list.record.days_totals,
        daily_consumption: list.record.daily_consumption,
        cumulative_consumption: list.record.cumulative_consumption,
        average_global: list.record.average_global,
        rest_day: list.record.rest_day,
        projection: list.record.projection,
        projected_payment: list.record.projected_payment,
        amount_payable: list.record.amount_payable,
        contracts: list.record.contract_id,
        status: status
      })
    })
    .then(res => {return res.json()})
    .then(res => {console.log('postRecord',res)})
    .catch(err => console.log(err))
  }
}
export function putRecord(list, token):Action{
  return dispatch => {
    return fetch(endPoint+'/records/?contract_id=' + list.contract_id + '&kwh=' + list.current_reading,{
      method: 'PUT',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Token ' + token
     },
     body: JSON.stringify({
        date: list.payday_limit,
        datetime: list.record.datetime,
        daily_reading: list.current_reading,
        rest_day: list.record.rest_day,
        projected_payment: list.amount_payable,
        amount_payable: list.amount_payable,
        contracts: list.contract_id,
        ratePeriod: list.ratePeriod,
        status: list.status
      })
    })
    .then(res => {return res.json()})
    .then(res => {console.log('res', res)})
    .catch(err => console.log(err))
  }
}
export function getRecord(id):Action{
  return dispatch => {
    return fetch(endPoint+'/records/?contract_id=' + id ,{
      method: 'GET',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       // 'Authorization': 'Token '+token
      },
    })
    .then(res => {return res.json()})
    .then(res=> dispatch(printRecord(res)))
    .catch(err => console.log(err))
  }
}

export function patchReceipt(data, token, id, navigation):Action{
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

export function postHistory(list, token):Action{
  console.log(list)
  return dispatch=>{
    return fetch(endPoint+'/history/',{
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Token '+token
      },
      body: JSON.stringify({
        contracts: list.contract_id,
        // period_name: 
        // date: list.payday_limit,
        // datetime: list.record.datetime,
      })
    })
    .then(res => {return res.json()})
    .then(res => {console.log(res)})
    .catch(err => console.log(err))
  }
}
