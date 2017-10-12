import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import drawer from "./drawer";
import user from "./user";
import list from "./list";
import list_contracts from "./list_contracts";
import list_states_mx from "./list_states_mx";
import list_mun_mx from "./list_mun_mx";
import list_rate from "./list_rates";
import list_records from "./list_records";


export default combineReducers({
  form: formReducer,
  drawer,
  user,
  list,
  list_contracts,
  list_states_mx,
  list_mun_mx,
  list_rate,
  list_records,

});
