const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {Types} = Schema;

const UserSchema = new Schema({
	userId: {type: String, required: [true, 'Отсутствует идетификатор пользователя'], unique: true, index: true},
	photo_200: {type: String, default: 'https://i.pravatar.cc/200'},
	first_name: {type: String, required: [true, 'Отсутствует имя пользователя'], default: 'John'},
	last_name: {type: String, required: [true, 'Отсутствует фамилия пользователя'], default: 'Doe'},
	groupsData: [
		{
			group: {type: Types.ObjectId, ref: 'Group'},
			role: {type: String}
		}
	],
	notification: {type: Boolean, default: false}
}, {timestamps: true});

UserSchema.methods.serialize = function (groupId) {
	const index = this.groupsData.findIndex(item => item.groupId === groupId);
	return {
		userId: this.userId,
		photo_200: this.photo_200,
		first_name: this.first_name,
		last_name: this.last_name,
		group: {
			groupId: this.groupsData[index].group.groupId,
			events: this.groupData[index].group.events,
			role: this.groupsData[index].role,
		},
		notification: this.notification
	}
}

const User = model('User', UserSchema);

module.exports = User;
