import type { Action } from "../actions/types";
import { SET_BILL, SET_INDEX } from "../actions/contracts";
import { GET_CONTRACT, SUCCES_CONTRACT } from "../actions/list_states_mx"
export type State = {
  list: string
};

const initialState = {
  contracts: [
  ],
  newContract:[

  ],
  selectedIndex: undefined
};

export default function(state: State = initialState, action: Action): State {

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
  if(action.type === SUCCES_CONTRACT){
    return{
      ...state,
      newContract: action.payload
    }
  }
  return state;
}
