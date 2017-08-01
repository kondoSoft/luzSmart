import type { Action } from './types';

export const SET_CONTRACT = 'SET_CONTRACT';
export const SET_BILL = 'SET_BILL';

export function setBill(payday_limit:string,amount_payable:number,current_reading:number,previous_reading:number):Action {
  return {
    type: SET_BILL,
    payday_limit: payday_limit,
    amount_payable: amount_payable,
    current_reading: current_reading,
    previous_reading: previous_reading,
  };
}
