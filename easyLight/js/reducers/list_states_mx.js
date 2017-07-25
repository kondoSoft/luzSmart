import type { Action } from "../actions/types";
import { GET_STATES, GET_MUNICIPALITY } from "../actions/list_states_mx";

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

  return state;
}
