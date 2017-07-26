import type { Action } from "../actions/types";
import { SET_CONTRACT, SET_BILL, SET_INDEX } from "../actions/contracts";

export type State = {
  list: string
};

const initialState = {
  contracts: [
    // 'contract': {
      // "id" : "1",
      // "name" : "Oficina",
      // "number_contract" : 324151,
      // "state" : "Tabasco",
      // "municipality" : "Centro",
      // "rate" : "Tarifa 1D",
      // "period_summer" : "Mar-Ago",
      // "type_payment" : "Bimestral",
      // "receipts" : {
      //   "1" : {
      //     "payday_limit" : "05 Nov 16",
      //     "amount_payable" : 525,
      //     "current_reading" : '06283',
      //     "previous_reading" : '06160',
      //     "current_data" : '06283',
      //     "contract" : 1,
      //     "status" : undefined
      //   },
      //   "2" : {
      //     "payday_limit" : "05 Nov 16",
      //     "amount_payable" : 525,
      //     "current_reading" : '06283',
      //     "previous_reading" : '06160',
      //     "current_data" : '06283',
      //     "contract" : 1,
      //     "status" : undefined
      //   }
      // },
      // "cost" : "$1500",
      // "image" : require('../../images/office.png')
      // }
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
  if ( action.type === SET_CONTRACT){
    return{
      ...state,
      contracts: [...state.contracts, {
        "name": action.payload.name,
        "state" : action.payload.state,
        "municipality" : action.payload.municipality,
        "rate" : action.payload.rate,
        "period_summer" : action.payload.period_summer,
        "type_payment" : action.payload.type_payment,
        "receipts" : {},
        "cost" : action.payload.cost,
        "image" : require('../../images/office.png')
        }
      ],
      // selectedIndex: action.payload
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
