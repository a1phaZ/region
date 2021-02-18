/***
 * Проверяет существует ли входной объект
 * @param p
 * @returns {boolean}
 */
const isExist = (p) => {
	console.log(p, !!p);
	return !!p
}

module.exports = {
	isExist
}