import { combineReducers } from "redux";
import show from './showReducer';
import manager from './managerReducer';
import sort from './sortReducer';
import search from './searchReducer';
const reducers = combineReducers({
show,
manager,
sort,
search
});

export default reducers;