import React from 'react';
import {UsersStack} from "@vkontakte/vkui";
import people from "../../helpers/people";

export default ({membersList = [], count = 3}) => {
	const membersPhotosList = membersList.map(({photo_200}) => photo_200);
	const helperText = membersList.map(({first_name}) => first_name).slice(0, count).join(', ');
	const membersListLength = membersList.length;
	const anotherCount = membersListLength - count;
	const _people = people(anotherCount);
	let helperDescription = ''
	if (anotherCount <0 && membersListLength !== 0) {
		if (membersListLength === 1) {
			helperDescription += ' идёт';
		} else {
			helperDescription += ' идут';
		}
	} else if (membersListLength === 0) {
		helperDescription = 'Пока ни кто не идет'
	} else {
		helperDescription += ` и ещё ${anotherCount} ${_people}`;
	}
	return (
		<UsersStack
			photos={membersPhotosList}
			size="s"
			count={count}
			// layout="vertical"
		>
			{helperText} <br/> {helperDescription}
		</UsersStack>
	)
}