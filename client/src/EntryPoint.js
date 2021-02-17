import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {AdaptivityProvider, AppRoot, ConfigProvider} from "@vkontakte/vkui";
import App from "./App";

import store from "./store";
import {Provider} from 'react-redux';

const EntryPoint = () => {
	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<Provider store={store}>
						<App/>
					</Provider>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	
	);
}

export default EntryPoint;

