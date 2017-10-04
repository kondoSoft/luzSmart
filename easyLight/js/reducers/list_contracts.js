import type { Action } from "../actions/types";
import { SET_BILL, SET_INDEX } from "../actions/contracts";
import { GET_CONTRACT, SUCCES_CONTRACT, GET_TIPS } from "../actions/list_states_mx"
import { PRINT_RECEIPTS, PICKER_CONTRACT } from "../actions/contracts"
export type State = {
  list: string
};

const initialState = {
  contracts: [],
  newContract:[],
  tips: [],
  selectedIndex: undefined,
  pickerContract: []
};

export default function(state: State = initialState, action: Action): State {

  if ( action.type === GET_CONTRACT){
    return{
      ...state,
      contracts: action.payload.results
    }
  }
  if ( action.type === PRINT_RECEIPTS){
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
  if(action.type === SUCCES_CONTRACT){
    return{
      ...state,
      newContract: action.payload
    }
  }
  if (action.type === GET_TIPS) {
    return {
      ...state,
      tips: action.payload
    }
  }
  if (action.type === PICKER_CONTRACT) {
    return {
      ...state,
      pickerContract: action.payload,
    }
  }
  return state;
}
