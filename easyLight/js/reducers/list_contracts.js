import type { Action } from "../actions/types";
import { SET_BILL, SET_INDEX } from "../actions/contracts";
import { GET_CONTRACT, SUCCES_CONTRACT, GET_TIPS } from "../actions/list_states_mx"
import { PRINT_RECEIPTS, PICKER_CONTRACT, RESET_PICKER, PRINT_REGION, PRINT_HIGH_CONSUMPTION } from "../actions/contracts"
export type State = {
  list: string
};

const initialState = {
  contracts: [],
  newContract:[],
  tips: [],
  selectedIndex: undefined,
  pickerContract: [],
  limitByRegion: [],
  highConsumption: [],

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
    console.log('action.payload', action.payload);
    const newContract = []
    newContract.push(action.payload)
    return{
      ...state,
      newContract,
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
  if (action.type === RESET_PICKER) {
    return {
      ...state,
      pickerContract: [],
    }
  }
  if ( action.type === PRINT_REGION){
    return{
      ...state,
      limitByRegion: action.payload.results
    }
  }
  if ( action.type === PRINT_HIGH_CONSUMPTION){
    return{
      ...state,
      highConsumption: action.payload.results
    }
  }
  return state;
}
