import React, {Component} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import EventCardList from "../components/Event/EventCardList";

import {sendData, getData} from "../actions/dashboardAction";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {PanelSpinner} from "@vkontakte/vkui";

class Events extends Component{
	constructor(/*props*/) {
		super();
		this.state = {
			data: []
		};
		this.callApi = this.callApi.bind(this);
		this.eventSignUp = this.eventSignUp.bind(this);
	}
	
	componentDidMount() {
		this.callApi();
	}
	
	eventSignUp = (payload) => {
		this.props.sendData('/api/data', payload);
	}
	
	callApi = () => {
		this.props.getData('/api/events');
	};
	
	render() {
		return (
			<Panel id={this.props.id}>
				<PanelHeader>Example</PanelHeader>
				<Group >
					{
						this.props.data.events
							?
							<EventCardList user={this.props.user} data={this.props.data.events} eventLogOut={this.eventSignUp} eventSignUp={this.eventSignUp} loading={this.props.fetch.isLoading}/>
							:
							<PanelSpinner />
					}
					
				</Group>
			</Panel>
		)
	}
}

function mapStateToProps(state){
	return {
		data : state.dashboardReducer.data,
		fetch: state.dashboardReducer.fetch
		// getDataFromBackend : state.dashboardReducer.getDataFromBackend
	}
}
const mapDispatchToProps = dispatch => bindActionCreators({
	sendData,
	getData
},dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Events);
