import React, {createContext, useReducer} from 'react';
import data from './mock';
import {EVENT_LOGOUT, EVENT_SIGNUP} from "./stateManager/const";
import {StateManager} from "./stateManager";

const initialState = {
	events: data
};

const reducer = (state, action) => {
	switch (action.type) {
		case EVENT_SIGNUP: {
			const {id, user} = action.payload;
			const {events} = state;
			return {
				...state,
				events: StateManager.eventSignUp({events, id, user})
			};
		}
		case EVENT_LOGOUT: {
			const {id, user} = action.payload;
			const {events} = state;
			return {
				...state,
				events: StateManager.eventLogOut({events, id, user})
			};
		}
		default:
			return state;
	}
}

export const State = createContext();

export const StateProvider = ({children}) => {
	const value = useReducer(reducer, initialState);
	return (
		<State.Provider value={value}>
			{children}
		</State.Provider>
	)
}