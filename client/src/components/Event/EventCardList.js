import React from 'react';
import EventCard from "./EventCard";
import {CardScroll, Group, Header, List} from "@vkontakte/vkui";

export default ({data, eventSignUp, eventLogOut, user}) => {
	const list = data.map(event => <EventCard key={event.id} eventSignUp={eventSignUp} eventLogOut={eventLogOut} user={user} {...event}/>)
	return (
		<List>
			<Group
				style={{overflow: 'hidden'}}
			>
				<Header mode={'tertiary'}>Последняя активность</Header>
				<CardScroll size={'l'}>
					{list}
				</CardScroll>
			</Group>
		</List>
	)
}