import React, {Component} from 'react';
import {Panel, PanelHeader} from "@vkontakte/vkui";
import {closePopout, goBack, openModal, openPopout, setPage} from "../../store/router/actions";
import {connect} from "react-redux";

class HomePanelIndex extends Component{
	render(): React.ReactNode {
		const {id, setPage} = this.props;
		
		return (
			<Panel id={id} >
				<PanelHeader>Index</PanelHeader>
			</Panel>
		)
	}
}

const mapDispatchToProps = {
	setPage,
	goBack,
	openPopout,
	closePopout,
	openModal
};

export default connect(null, mapDispatchToProps)(HomePanelIndex);