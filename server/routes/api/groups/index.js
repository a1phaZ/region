const Group = require('../../../models/Group');
const {isExist} = require("../../../helpers/checkInputData");

const getGroup = async (req, res, next) => {
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
	
	const filter = {groupId: vk_group_id}
	await Group.findOne(filter)
		.populate({
			path: 'events',
			populate: {
				path: 'organizer membersList',
				select: '-_id -createdAt -updatedAt -groupsData -__v'
			},
			select: '-createdAt -updatedAt -__v'
		})
		.then(group => res.status(200).json(group))
		.catch(err => {
			console.log(err);
			return next(new Error('Ошибка чтения из базы данных'))
		});
}

const addGroup = async (req, res, next) => {
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
	if (vk_viewer_group_role !== 'admin') return next(new Error('Вы не являетесь администратором группы'));
	
	const group = new Group({
		groupId: vk_group_id,
		events: []
	})
	await group.save()
		.populate({
			path: 'events',
			populate: {
				path: 'organizer membersList',
				select: '-_id -createdAt -updatedAt -groupsData -__v'
			},
			select: '-createdAt -updatedAt -__v'
		})
		.then(group => res.status(200).json(group))
		.catch(err => {
			if (err.code === 11000 && err.name === 'MongoError') {
				return next(new Error('Данная группа уже существует в базе данных'));
			}
			return next(new Error('Ошибка записи в базу даных'))
		})
}

module.exports = {
	getGroup,
	addGroup
}