import {combineReducers} from "redux";
import {clientEventReducer} from "./clientEventReducer";
import {adminEventReducer} from "./adminEventReducer";

const config = {
	clientEventReducer: clientEventReducer,
	adminEventReducer: adminEventReducer
}

const appReducer = combineReducers(config);

export default appReducer;
