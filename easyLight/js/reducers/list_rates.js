import type { Action } from "../actions/types";
import { GET_STATES, GET_MUNICIPALITY, GET_RATE } from "../actions/list_states_mx";

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
    return {
      ...state,
      results: action.payload[0].rate
    };
  }

  return state;
}
