import type { Action } from "../actions/types";
import { PRINT_RECORD, RESET_RECORD, PRINT_HISTORY } from "../actions/contracts";
export type State = {
  list: string
};

const initialState = {
  results: [],
  history: [],
};

export default function(state: State = initialState, action: Action): State {
	if ( action.type === PRINT_RECORD ) {
		return{
			...state,
			results: action.payload.results
		}
	}
	if ( action.type === RESET_RECORD) {
		return{
			...state,
			results:[]
		}
	}
  if ( action.type === PRINT_HISTORY) {
    return {
      ...state,
      history:[action.payload.results]
    }
  }
	return state;
}
