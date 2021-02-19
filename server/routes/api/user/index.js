const User = require('../../../models/User');
const {isExist} = require("../../../helpers/checkInputData");

const getUser = async (req, res, next) => {
	const {
		query: {
			vk_user_id,
			vk_group_id
		}
	} = req;
	//TODO Прикрутить создание ошибок
	if (!isExist(vk_user_id)) return next(new Error('Нет идетификатора пользователя'));
	if (!isExist(vk_group_id)) return next(new Error('Нет идетификатора группы'));
	return await User.findOne({userId: vk_user_id})
		.then(user => {
			if (!isExist(user)) {
				return {}
			}
			return user.serialize(vk_group_id);
		})
		.then(serializedUser => res.status(200).json(serializedUser))
		.catch(err => next(new Error(err.message)));
}

const addUser = async (req, res, next) => {
	const {
		query: {
			vk_user_id,
			vk_group_id,
			vk_viewer_group_role
		}
	} = req;
	if (!isExist(vk_user_id)) return next(new Error('Нет идетификатора пользователя'));
	if (!isExist(vk_group_id)) return next(new Error('Нет идетификатора группы'));
	if (!isExist(vk_viewer_group_role)) return next(new Error('Нет роли пользователя'));
	
	const filter = {userId: vk_user_id};
	const dbUser = await User.findOne(filter);
	if (!dbUser) {
		const newUser = new User({
			userId: vk_user_id,
			groupsData: [{
				groupId: vk_group_id,
				role: vk_viewer_group_role
			}]
		})
		return await newUser.save()
			.then(user => user.serialize(vk_group_id))
			.then(serializedUser => res.status(200).json(serializedUser))
			.catch(err => next(new Error(err.message)));
	}
	
	const index = dbUser.groupsData.findIndex(item => item.groupId === vk_group_id);
	if (index !== -1) {
		const {groupId, role} = dbUser.groupsData[index];
		if (groupId === vk_group_id && role === vk_viewer_group_role) {
			return res.status(200).json(dbUser.serialize(vk_group_id));
		}
		dbUser.groupsData[index].groupId = vk_group_id;
		dbUser.groupsData[index].role = vk_viewer_group_role;
		return await dbUser.save()
			.then(user => user.serialize(vk_group_id))
			.then(serializedUser => res.status(200).json(serializedUser))
			.catch(err => next(new Error(err.message)));
	}
	dbUser.groupsData.push({groupId: vk_group_id, role: vk_viewer_group_role});
	return await dbUser.save()
		.then(user => user.serialize(vk_group_id))
		.then(serializedUser => res.status(200).json(serializedUser))
		.catch(err => next(new Error(err.message)));
}

module.exports = {
	getUser,
	addUser
};