const Event = require('../../../models/Event');
const Group = require('../../../models/Group');
const User = require('../../../models/User');
const {isExist, isValidEventData, isValidObjectId} = require("../../../helpers/checkInputData");

const getEvents = async (req, res, next) => {
	const {
		query: {
			vk_user_id,
			vk_group_id
		}
	} = req;
	if (!isExist(vk_user_id)) return next(new Error('Нет идетификатора пользователя'));
	if (!isExist(vk_group_id)) return next(new Error('Нет идетификатора группы'));
	
	const filter = {groupId: vk_group_id};
	await Group.findOne(filter)
		.populate({
			path: 'events',
			populate: {
				path: 'organizer membersList',
				select: '-_id -createdAt -updatedAt -groupsData -__v'
			},
			select: '-createdAt -updatedAt -__v'
		})
		.then(group => res.status(200).json(group.events))
		.catch(err => {
			console.log(err);
			return next(new Error('Ошибка чтения из базы данных'));
		})
}

const getEvent = async (req, res, next) => {
	const {
		query: {
			vk_group_id
		},
		params: {
			id
		}
	} = req;
	if (!isExist(vk_group_id)) return next(new Error('Нет идетификатора группы'));
	if (!isValidObjectId(id)) return next(new Error('Недопустимый идентификатор события'));
	
	await Event.findById(id)
		.select('-createdAt -updatedAt -groupsData -__v')
		.populate({
			path: 'organizer membersList',
			select: '-_id -createdAt -updatedAt -groupsData -__v'
		})
		.then(event => res.status(200).json(event))
		.catch(err => {
			console.log(err);
			return next(new Error('Ошибка чтения из базы данных'));
		});
}

const addEvent = async (req, res, next) => {
	const {
		query: {
			vk_user_id,
			vk_group_id,
			vk_viewer_group_role
		},
		body: {
			title, date, time, timeZone, organizer, maxCount
		}
	} = req;
	if (!isExist(vk_user_id)) return next(new Error('Нет идетификатора пользователя'));
	if (!isExist(vk_group_id)) return next(new Error('Нет идетификатора группы'));
	if (!isExist(vk_viewer_group_role)) return next(new Error('Нет роли пользователя'));
	if (vk_viewer_group_role !== 'admin') return next(new Error('Вы не являетесь администратором группы'));
	if (!isValidEventData({title, date, time, timeZone, organizer, maxCount})) return next(new Error('Ошибка входных данных'));
	
	const filter = {groupId: vk_group_id};
	const dbGroup = await Group.findOne(filter);
	if (!dbGroup) {return next(new Error('Группа еще не добавлена, сначала добавьте группу'))}
	
	const dbOrganizer = await User.findOne({userId: vk_user_id});
	
	const newEvent = new Event({
		title,
		date,
		time,
		timeZone,
		organizer: dbOrganizer._id,
		maxCount,
		membersList: []
	});
	
	await newEvent.save();
	dbGroup.events.push(newEvent._id);
	await dbGroup.save();
	await Event.findById(newEvent._id)
		.select('-createdAt -updatedAt -groupsData -__v')
		.populate({
			path: 'organizer membersList',
			select: '-_id -createdAt -updatedAt -groupsData -__v'
		})
		.then(event => res.status(200).json(event))
		.catch(err => {
			console.log(err);
			return next(new Error('Ошибка записи в базу данных'));
		});
}

const updateEvent = async (req, res, next) => {

}

const deleteEvent = async (req, res, next) => {

}

module.exports = {
	getEvents,
	getEvent,
	addEvent,
	updateEvent,
	deleteEvent
}
