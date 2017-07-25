import type { Action } from "../actions/types";
import { GET_MUNICIPALITY, RESET_MUNICIPALITY} from "../actions/list_states_mx";

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

  return state;
}
