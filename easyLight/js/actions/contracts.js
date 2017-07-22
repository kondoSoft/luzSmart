import type { Action } from './types';

export const SET_CONTRACT = 'SET_CONTRACT';

export function setContract(payday_limit:string,amount_payable:number,current_reading:number,previous_reading:number):Action {
  return {
    type: SET_CONTRACT,
    payday_limit: payday_limit,
    amount_payable: amount_payable,
    current_reading: current_reading,
    previous_reading: previous_reading,
  };
}
