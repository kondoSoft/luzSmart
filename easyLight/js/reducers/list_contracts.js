import type { Action } from "../actions/types";
import { SET_CONTRACT } from "../actions/contracts";

export type State = {
  list: string
};

const initialState = {
  contracts: {
    'contract': {
      "name" : "Oficina",
      "number_contract" : 324151,
      "state" : "Tabasco",
      "municipality" : "Centro",
      "rate" : "Tarifa 1D",
      "period_summer" : "Mar-Ago",
      "type_payment" : "Bimestral",
      "receipt" : undefined,
      "cost" : "$1500",
      "image" : require('../../images/office.png')
    }
  },
  receipts: {
    "receipt": {
      "payday_limit" : "05 Nov 16",
      "amount_payable" : 525,
      "current_reading" : '06283',
      "previous_reading" : '06160',
      "current_data" : '06283',
    },
  },
  selectedIndex: undefined
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === SET_CONTRACT) {
    console.log(action.payday_limit);
    var myKey = Date.now()
    console.log(state);
    var newState = state
    state.receipts[myKey] = {
    payday_limit: action.payday_limit,
    amount_payable: action.amount_payable,
    current_reading: action.current_reading,
    previous_reading: action.previous_reading
  }
    return {
      ...state,
      newState
      // ...state,
      // receipts: {...state.receipts,
      //   ${myKey}:{
      //   payday_limit: action.payday_limit,
      //   amount_payable: action.amount_payable,
      //   current_reading: action.current_reading,
      //   previous_reading: action.previous_reading
      // }
      // }
    };
  }
  return state;
}
