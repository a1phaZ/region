import getUserIndex from "../helpers/getUserIndex";

export class StateManager {
	static eventSignUp({id, user, events}) {
		const index = events.findIndex(event => event.id.toString() === id);
		const event = events[index];
		const userIndex = getUserIndex({membersList: event.membersList, user})
		if (userIndex !== -1) {
			return events
		}
		events[index].membersList.push({...user});
		return events
	}
	
	static eventLogOut({id, user, events}) {
		const index = events.findIndex(event => event.id.toString() === id);
		const event = events[index];
		const userIndex = getUserIndex({membersList: event.membersList, user})
		if (userIndex === -1) {
			return events
		}
		events[index].membersList.splice(userIndex, 1);
		return events
	}
}