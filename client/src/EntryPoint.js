import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {AdaptivityProvider, AppRoot, ConfigProvider} from "@vkontakte/vkui";
import App from "./App";
import {StateProvider} from "./state";

const EntryPoint = () => {
	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<StateProvider>
						<App/>
					</StateProvider>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	
	);
}

export default EntryPoint;

