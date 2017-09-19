import type { Action } from "../actions/types";
import { GET_STATES, GET_MUNICIPALITY, GET_RATE, RESET_RATE } from "../actions/list_states_mx";
import { PRINT_RATE_PERIOD } from "../actions/contracts";


export type State = {
  list: string
};

const initialState = {
  results: [],
  list_rate: [],
  selectedIndex: undefined,
  rate_period: '',
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === GET_RATE) {
    return {
      ...state,
      results: action.payload[0].rate,
    }
  }
  if (action.type === RESET_RATE) {
    return {
      ...state,
      results: [],
    }
  }
  if(action.type === PRINT_RATE_PERIOD) {
    return {
      ...state,
      rate_period: action.payload.results,
    }
  }

  return state;
}
