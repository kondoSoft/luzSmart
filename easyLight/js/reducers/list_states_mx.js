import type { Action } from "../actions/types";
import { GET_STATES, GET_MUNICIPALITY } from "../actions/list_states_mx";

import {REHYDRATE} from 'redux-persist/constants'


export type State = {
  list: string
};

const initialState = {
  results:[],

  selectedIndex: undefined
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === GET_STATES) {
    return {
      ...state,
      results: action.payload
    };
  }
  else if (action.type === REHYDRATE){
    var incoming = action.payload.list_states_mx
    if (incoming) return {...state, ...incoming}
    return state
  }

  return state;
}
