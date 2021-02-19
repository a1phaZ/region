const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {Types} = Schema;

const GroupSchema = new Schema({
	groupId: {type: String, required: true, unique: true, index: true},
	events: [
		{type: Types.ObjectId, ref: 'Event'}
	]
});

const Group = model('Group', GroupSchema);

module.exports = Group;
