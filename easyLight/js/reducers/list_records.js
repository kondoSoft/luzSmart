import type { Action } from "../actions/types";
import { PRINT_RECORD } from "../actions/contracts";
export type State = {
  list: string
};

const initialState = {
  results: [],
};

export default function(state: State = initialState, action: Action): State {
	if ( action.type === PRINT_RECORD ) {
		return{
			...state,
			results: action.payload.results
		}
	}
	return state;
}