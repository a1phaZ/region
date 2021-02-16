import React from 'react';
import {UsersStack} from "@vkontakte/vkui";
import people from "../../helpers/people";

export default ({membersList = [], count = 3}) => {
	const membersPhotosList = membersList.map(({photo_200}) => photo_200);
	const helperText = membersList.map(({first_name}) => first_name).slice(0, count).join(', ');
	const membersListLength = membersList.length;
	const anotherCount = membersListLength - count;
	const _people = people(anotherCount);
	return (
		<UsersStack
			photos={membersPhotosList}
			size="m"
			count={count}
			// layout="vertical"
		>
			{helperText}<br />и ещё {anotherCount} {_people}
		</UsersStack>
	)
}