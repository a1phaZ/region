import React, {Component} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import EventCardList from "../components/Event/EventCardList";

import {sendData, getData} from "../actions/dashboardAction";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

class Events extends Component{
	constructor(/*props*/) {
		super();
		this.state = {
			data: []
		};
		this.callApi = this.callApi.bind(this);
	}
	
	componentDidMount() {
		this.callApi();
	}
	
	callApi = () => {
		this.props.getData('/api/hello');
	};
	
	render(): React.ReactNode {
		return (
			<Panel id={this.props.id}>
				<PanelHeader>Example</PanelHeader>
				<Group >
					<EventCardList user={this.props.user} data={this.props.getDataFromBackend.data} eventLogOut={() => {}} eventSignUp={() => {}}/>
				</Group>
			</Panel>
		)
	}
}

function mapStateToProps(state){
	return {
		dataFromBackend : state.dashboardReducer.dataFromBackend,
		getDataFromBackend : state.dashboardReducer.getDataFromBackend
	}
}
const mapDispatchToProps = dispatch => bindActionCreators({
	sendData,
	getData
},dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Events);
