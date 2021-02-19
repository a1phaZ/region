const { Types: {ObjectId}} = require('mongoose');

/***
 * Проверяет существует ли входной объект
 * @param p
 * @returns {boolean}
 */
const isExist = (p) => {
	return !!p
}

/**
 * Проверяет валидность id для MongoDB
 * @param id
 * @returns {boolean|boolean}
 */
const isValidObjectId = (id) => {
	return (ObjectId.isValid(id) && (new ObjectId(id)).toString() === id)
}

const isValidEventData = ({title, date, time, timeZone, organizer, maxCount}) => {
	if (!isExist(title) || !isExist(date) || !isExist(time) || !isExist(timeZone) || !isExist(organizer) || !isExist(maxCount)) return false;
	// if (!isValidObjectId(organizer)) return false;
	return true;
}

module.exports = {
	isExist,
	isValidObjectId,
	isValidEventData
}