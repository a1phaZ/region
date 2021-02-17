export const initialState = {
	data: {},
	fetch: {}
}

export const clientEventReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ISLOADING':
			return {
				...state,
				fetch: action.fetch
			}
		case 'DATA_FROM_BACKEND':
			return {
				...state,
				data: action.data
			}
		case 'GET_DATA':
			return {
				...state,
				data: action.data
			}
		default:
			return state
		
	}
}