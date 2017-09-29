import type { Action } from "../actions/types";
import { GET_MUNICIPALITY, RESET_MUNICIPALITY} from "../actions/list_states_mx";
import {REHYDRATE} from 'redux-persist/constants'

export type State = {
  list: string
};

const initialState = {
  results:[],
  selectedIndex: undefined
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === GET_MUNICIPALITY) {
    return {
      ...state,
      results: action.payload.results
    };
  }
  if(action.type === RESET_MUNICIPALITY) {
    return {
      ...state,
      results: []
    }
  }
  // else if(action.type === REHYDRATE){
  //   var incoming = action.payload.list_mun_mx
  //   if (incoming) return {...state, ...incoming}
  //   return state
  // }

  return state;
}
