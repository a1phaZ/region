import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import EventCardList from "../components/Event/EventCardList";

const Home = ({id, data, eventSignUp, eventLogOut, user}) => (
	<Panel id={id}>
		<PanelHeader>Example</PanelHeader>
		<Group >
			<EventCardList data={data} eventSignUp={eventSignUp} eventLogOut={eventLogOut} user={user}/>
		</Group>
	</Panel>
);

export default Home;
