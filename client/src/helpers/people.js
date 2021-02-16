export default (number) => {
	const n = number.toString()[number.toString().length-1];
	if (n === '2' || n === '3' || n === '4') return 'человека'
	return 'человек'
}