import {combineReducers} from "redux";
import {clientEventReducer} from "./clientEventReducer";

const config = {
	clientEventReducer: clientEventReducer
}

const appReducer = combineReducers(config);

export default appReducer;
