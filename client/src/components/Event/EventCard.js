import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {Caption, FormLayout, SimpleCell, Subhead, Title} from "@vkontakte/vkui";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Card from "@vkontakte/vkui/dist/components/Card/Card";
import CustomUsersStack from "../custom/CustomUsersStack";
import {format} from 'date-fns';
import getUserIndex from "../../helpers/getUserIndex";

export default ({id, title, date, time, organizer, maxCount, membersList, eventSignUp, eventLogOut, user}) => {
	const userIndex = getUserIndex({membersList, user});
	const membersCount = membersList.length;
	const formatedDate = format(new Date(date), 'dd.MM.yyyy');
	const buttonText = userIndex === -1 ? 'Записаться' : 'Снять запись'

	return (
		<Card size="l" mode="outline" style={{width: 'auto'}}>
			<Div>
				<Title level="1" weight="heavy" style={{marginBottom: 16}}>{title}</Title>
				<Subhead weight="bold" >{`${formatedDate} ${time}`}</Subhead>
			</Div>
			<SimpleCell
				expandable
				before={<Avatar size={40} src={organizer.photo_200}/>}
			>
				{`${organizer.first_name} ${organizer.last_name}`}
			</SimpleCell>
			<Div>
				<Caption level="1" weight="semibold" caps>{`${membersCount} / ${maxCount}`}</Caption>
			</Div>
			<Div>
				<CustomUsersStack membersList={membersList}/>
			</Div>
			<Div>
				<FormLayout>
					<Button
						size={'l'}
						stretched
						disabled={userIndex === -1 && maxCount <= membersCount}
						mode={userIndex === -1 ? 'commerce' : 'destructive'}
						data-id={id}
						onClick={
							userIndex === -1
								?
								(e) => {
									eventSignUp({id: e.currentTarget.dataset.id, user});
								}
								:
								(e) => {
									eventLogOut({id: e.currentTarget.dataset.id, user});
								}
						}
					>
						{buttonText}
					</Button>
				</FormLayout>
			</Div>
		</Card>
	)
}