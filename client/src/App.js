import React, {useContext} from 'react';
import {
	Cell,
	Epic,
	Group,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Placeholder,
	SplitCol,
	SplitLayout,
	Tabbar,
	TabbarItem,
	usePlatform,
	View,
	ViewWidth,
	VKCOM
} from "@vkontakte/vkui";
import {
	Icon28ClipOutline,
	Icon28MessageOutline,
	Icon28NewsfeedOutline,
	Icon28ServicesOutline,
	Icon28UserCircleOutline
} from "@vkontakte/icons";
import withAdaptivity from "@vkontakte/vkui/dist/hoc/withAdaptivity";
import Home from "./panels/Home";
import {State} from "./state";
import {EVENT_LOGOUT, EVENT_SIGNUP} from "./stateManager/const";

const user = {
	userId: '10',
	photo_200: 'https://i.pravatar.cc/40?img=1',
	first_name: 'Artemiy',
	last_name: 'Zebzeev',
}

const App = withAdaptivity(({viewWidth}) => {
	const platform = usePlatform();
	const [activeStory, setActiveStory] = React.useState('profile');
	const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
	const isDesktop = viewWidth >= ViewWidth.TABLET;
	const hasHeader = platform !== VKCOM;
	const [state, dispatch] = useContext(State);
	
	const eventSignUp = ({id, user}) => {
		dispatch({type: EVENT_SIGNUP, payload: {id, user}});
	}
	const eventLogOut = ({id, user}) => {
		dispatch({type: EVENT_LOGOUT, payload: {id, user}});
	}

	return (
		<SplitLayout
			header={hasHeader && <PanelHeader separator={false}/>}
			style={{justifyContent: "center"}}
		>
			{isDesktop && (
				<SplitCol fixed width="280px" maxWidth="280px">
					<Panel>
						{hasHeader && <PanelHeader/>}
						<Group>
							<Cell
								disabled={activeStory === 'feed'}
								style={activeStory === 'feed' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="feed"
								onClick={onStoryChange}
								before={<Icon28NewsfeedOutline/>}
							>
								feed
							</Cell>
							<Cell
								disabled={activeStory === 'services'}
								style={activeStory === 'services' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="services"
								onClick={onStoryChange}
								before={<Icon28ServicesOutline/>}
							>
								services
							</Cell>
							<Cell
								disabled={activeStory === 'messages'}
								style={activeStory === 'messages' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="messages"
								onClick={onStoryChange}
								before={<Icon28MessageOutline/>}
							>
								messages
							</Cell>
							<Cell
								disabled={activeStory === 'clips'}
								style={activeStory === 'clips' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="clips"
								onClick={onStoryChange}
								before={<Icon28ClipOutline/>}
							>
								clips
							</Cell>
							<Cell
								disabled={activeStory === 'profile'}
								style={activeStory === 'profile' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="profile"
								onClick={onStoryChange}
								before={<Icon28UserCircleOutline/>}
							>
								profile
							</Cell>
						</Group>
					</Panel>
				</SplitCol>
			)}
			
			<SplitCol
				animate={!isDesktop}
				spaced={isDesktop}
				width={isDesktop ? '560px' : '100%'}
				maxWidth={isDesktop ? '560px' : '100%'}
			>
				<Epic activeStory={activeStory} tabbar={!isDesktop &&
				<Tabbar>
					<TabbarItem
						onClick={onStoryChange}
						selected={activeStory === 'feed'}
						data-story="feed"
						text="Новости"
					><Icon28NewsfeedOutline/></TabbarItem>
					<TabbarItem
						onClick={onStoryChange}
						selected={activeStory === 'services'}
						data-story="services"
						text="Сервисы"
					><Icon28ServicesOutline/></TabbarItem>
					<TabbarItem
						onClick={onStoryChange}
						selected={activeStory === 'messages'}
						data-story="messages"
						label="12"
						text="Сообщения"
					><Icon28MessageOutline/></TabbarItem>
					<TabbarItem
						onClick={onStoryChange}
						selected={activeStory === 'clips'}
						data-story="clips"
						text="Клипы"
					><Icon28ClipOutline/></TabbarItem>
					<TabbarItem
						onClick={onStoryChange}
						selected={activeStory === 'profile'}
						data-story="profile"
						text="Профиль"
					><Icon28UserCircleOutline/></TabbarItem>
				</Tabbar>
				}>
					<View id="feed" activePanel="feed">
						<Home data={state.events} id={'feed'} eventSignUp={eventSignUp} eventLogOut={eventLogOut} user={user}/>
						{/*<Panel id="feed">*/}
						{/*	<PanelHeader left={<PanelHeaderBack/>}>Новости</PanelHeader>*/}
						{/*	<Group>*/}
						{/*		<Placeholder icon={<Icon56NewsfeedOutline width={56} height={56}/>}/>*/}
						{/*	</Group>*/}
						{/*</Panel>*/}
					</View>
					<View id="services" activePanel="services">
						<Panel id="services">
							<PanelHeader left={<PanelHeaderBack/>}>Сервисы</PanelHeader>
							<Group>
								<Placeholder icon={<Icon28ServicesOutline width={56} height={56}/>}>
								</Placeholder>
							</Group>
						</Panel>
					</View>
					<View id="messages" activePanel="messages">
						<Panel id="messages">
							<PanelHeader left={<PanelHeaderBack/>}>Сообщения</PanelHeader>
							<Group>
								<Placeholder icon={<Icon28MessageOutline width={56} height={56}/>}>
								</Placeholder>
							</Group>
						</Panel>
					</View>
					<View id="clips" activePanel="clips">
						<Panel id="clips">
							<PanelHeader left={<PanelHeaderBack/>}>Клипы</PanelHeader>
							<Group>
								<Placeholder icon={<Icon28ClipOutline width={56} height={56}/>}>
								</Placeholder>
							</Group>
						</Panel>
					</View>
					<View id="profile" activePanel="profile">
						<Panel id="profile">
							<PanelHeader left={<PanelHeaderBack/>}>Профиль</PanelHeader>
							<Group>
								<Placeholder icon={<Icon28UserCircleOutline width={56} height={56}/>}>
								</Placeholder>
							</Group>
						</Panel>
					</View>
				</Epic>
			</SplitCol>
		</SplitLayout>
	);
}, {
	viewWidth: true
});

export default App;