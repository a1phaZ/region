const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {Types} = Schema;

const EventSchema = new Schema({
	title: {type: String, required: [true, 'Отсутствует название']},
	date: {type: String, required: [true, 'Отсутствует дата']},
	time: {type: String, required: [true, 'Отсутствует время']},
	timeZone: {type: Number, required: [true, 'Отсутствует часовой пояс']},
	organizer: {type: Types.ObjectId, ref: 'User'},
	maxCount: {type: Number, default: 0},
	membersList: [
		{type: Types.ObjectId, ref: 'User'}
	]
}, {timestamps: true});

const Event = model('Event', EventSchema);

module.exports = Event;

// {
// 	id: 1,
// 		title: 'test 1',
// 	date: '2021-01-01',
// 	time: '10:00',
// 	timeZone: 500,
// 	organizer: {
// 	userId: '1',
// 		photo_200: 'https://i.pravatar.cc/40?img=1',
// 		first_name: 'Artemiy',
// 		last_name: 'Zebzeev',
// },
// 	maxCount: 9,
// 		membersList: [
// 	{
// 		userId: '1',
// 		photo_200: 'https://i.pravatar.cc/40?img=1',
// 		first_name: 'Artemiy',
// 		last_name: 'Zebzeev',
// 	}
// ]
// }