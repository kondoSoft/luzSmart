import type { Action } from "../actions/types";
import { GET_STATES, GET_MUNICIPALITY, GET_RATE, GET_RATE_UNIQUE } from "../actions/list_states_mx";

export type State = {
  list: string
};

const initialState = {
  results:[],
  list_rate:[],
  selectedIndex: undefined
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === GET_RATE) {
    console.log(action.payload);
    return {
      ...state,
      results: action.payload
    };
  }
  if (action.type === GET_RATE_UNIQUE) {
    return {
      ...state,
      list_rate: action.payload.results
    };
  }

  return state;
}
