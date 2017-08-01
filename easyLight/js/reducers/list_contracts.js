import type { Action } from "../actions/types";
import { SET_BILL, SET_INDEX } from "../actions/contracts";
import { GET_CONTRACT } from "../actions/list_states_mx"
export type State = {
  list: string
};

const initialState = {
  contracts: [
    ],

  receipts: {
    "receipt": {
      "payday_limit" : "05 Nov 16",
      "amount_payable" : 525,
      "current_reading" : '06283',
      "previous_reading" : '06160',
      "current_data" : '06283',
      "contract" : 1,
      "status" : undefined
    },
  },
  selectedIndex: undefined
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === SET_BILL) {
    var myKey = Date.now()
    var newState = state
    state.receipts[myKey] = {
    payday_limit: action.payday_limit,
    amount_payable: action.amount_payable,
    current_reading: action.current_reading,
    previous_reading: action.previous_reading,
    status: action.status
  }
    return {
      ...state,
      newState
    };
  }
  if ( action.type === GET_CONTRACT){
    return{
      ...state,
      contracts: action.payload.results
    }
  }
  if (action.type === SET_INDEX){
    return{
      ...state,
      selectedIndex: action.payload
    }
  }
  return state;
}
