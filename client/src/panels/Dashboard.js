import React, {Component} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

import {getData, sendData} from "../actions/clientEventAction";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {FormItem, FormLayout, Button} from "@vkontakte/vkui";

class Dashboard extends Component {
	constructor(/*props*/) {
		super();
		this.state = {
			data: []
		};
		this.callApi = this.callApi.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.eventSignUp = this.eventSignUp.bind(this);
	}
	
	componentDidMount() {
		const data = this.callApi();
		console.log(data);
	}
	
	// eventSignUp = (payload) => {
	// 	this.props.sendData(`/api/events/${payload.id}/signup`, payload);
	// }
	//
	// eventLogout = (payload) => {
	// 	this.props.sendData(`/api/events/${payload.id}/logout`, payload);
	// }
	//
	callApi = () => {
		this.props.getData('/api/dashboard');
	};
	
	handleSubmit = (e) => {
		e.preventDefault();
		const payload = {
			title: 'from code',
			date: '2021-03-03',
			time: '12:00',
			timeZone: 500,
			organizer: {
				userId: '1',
				photo_200: 'https://i.pravatar.cc/40?img=1',
				first_name: 'Artemiy',
				last_name: 'Zebzeev',
			},
			maxCount: 15,
			membersList: []
		}
		this.props.sendData('/api/dashboard/events/create', payload);
	}
	
	render() {
		return (
			<Panel id={this.props.id}>
				<PanelHeader>Dashboard</PanelHeader>
				<FormLayout
					onSubmit={this.handleSubmit}
				>
					<FormItem>
						<Button size="l" stretched>Зарегистрироваться</Button>
					</FormItem>
				</FormLayout>
			</Panel>
		)
	}
}

function mapStateToProps(state) {
	return {
		data: state.adminEventReducer.data,
		fetch: state.adminEventReducer.fetch
		// getDataFromBackend : state.clientEventReducer.getDataFromBackend
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	sendData,
	getData
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);