import {DATA_FROM_BACKEND, GET_DATA} from "./actionTypes";

export const initialState = {
	data: {}
}

export const dbReducer = (state = initialState, action) => {
	switch (action.type) {
		case DATA_FROM_BACKEND:
			return {
				...state,
				data: action.data
			}
		case GET_DATA:
			return {
				...state,
				data: action.data
			}
		default:
			return state
	}
}