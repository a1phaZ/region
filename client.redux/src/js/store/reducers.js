import {combineReducers} from "redux";
import {routerReducer} from './router/reducers';
import {vkuiReducer} from './vk/reducers';
import {formDataReducer} from "./formData/reducers";
import {dbReducer} from "./db/reducers";

export default combineReducers({
    vkui: vkuiReducer,
    router: routerReducer,
    formData: formDataReducer,
    db: dbReducer
});