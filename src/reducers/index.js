import { combineReducers } from "redux";
import show from './showReducer';
import  check from "./checkReducer";
import manager from './managerReducer';
const reducers = combineReducers({
show,
check,
manager,

});

export default reducers;