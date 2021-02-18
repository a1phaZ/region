const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
	userId: {type: String, required: [true, 'Отсутствует идетификатор пользователя'], unique: true},
	groupsData: [
		{
			groupId: {type: String},
			role: {type: String}
		}
	],
	notification: {type: Boolean, default: false}
}, {timestamps: true});

UserSchema.methods.serialize = function (groupId) {
	const index = this.groupsData.findIndex(item => item.groupId === groupId);
	return {
		userId: this.userId,
		group: {
			groupId: this.groupsData[index].groupId,
			role: this.groupsData[index].role,
		},
		notification: this.notification
	}
}

const User = model('User', UserSchema);

module.exports = User;
