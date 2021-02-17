export const sendData = (url, payload) => {
	return dispatch => {
		dispatch({type: 'ISLOADING', fetch: {isLoading: true}});
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload)
		}).then(res => res.json())
			.then(res => {
				dispatch({type: 'DATA_FROM_BACKEND', data: res})
				dispatch({type: 'ISLOADING', fetch: {isLoading: false}});
			})
			.catch(err => {
				console.log('Api error', err)
			})
	}
}

export const getData = (url) => {
	return dispatch => {
		
		// dispatch({type: 'GET_DATA', getDataFromBackend: {data: mock}})
		return fetch(url)
			.then(res => {
				return res.json();
			})
			.then(res => {
				dispatch({type: 'GET_DATA', data: res})
			})
			.catch(err => {
				console.log('Api error', err)
			})
	}
}