import {GET_DATA, DATA_FROM_BACKEND} from "./actionTypes";

export const sendData = (url, payload) => {
	return dispatch => {
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload)
		}).then(res => res.json())
			.then(res => {
				dispatch({type: DATA_FROM_BACKEND, data: res})
			})
			.catch(err => {
				console.log('Api error', err)
			})
	}
}

export const getData = (url) => {
	return dispatch => {
		return fetch(url)
			.then(res => {
				return res.json();
			})
			.then(res => {
				dispatch({type: GET_DATA, data: res})
			})
			.catch(err => {
				console.log('Api error', err)
			})
	}
}