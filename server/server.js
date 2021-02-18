const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const {createError, handleError} = require("./helpers/error");

// const getUserIndex = ({membersList, user}) => membersList.findIndex(({userId}) => userId.toString() === user.userId.toString());
dotenv.config();
const app = express();
require('./config/db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// if (process.env.STATUS !== 'dev') {
// 	app.use(require('./handlers/compareSign'));
// 	app.use(rateLimiterMiddleware);
// }

app.use(require('./routes'));

app.use(function (req, res, next) {
	next(createError(404, 'Запрашиваемый адрес не найден'));
});

// error-box handler
app.use((err, req, res, next) => {
	handleError(err, res)
});

const server = app.listen(process.env.PORT || 3000, () => {
	console.debug('Server start at port:' + server.address().port);
});

// app.get('/api/events', (req, res) => {
// 	console.log('/api/events');
// 	res.send({events: events})
// });
//
// app.get('/api/dashboard', (req, res) => {
// 	console.log('/api/events');
// 	res.send({events: events})
// });
//
// app.post('/api/dashboard/events/create', (req, res) => {
// 	const event = req.body;
// 	event.id = events.length + 1;
// 	events.push(event);
// 	res.json({events: events});
// })
//
// app.post('/api/events/:id/signup', (req, res) => {
// 	const {id} = req.params;
// 	const {user} = req.body;
// 	const index = events.findIndex(event => event.id.toString() === id);
// 	const event = events[index];
// 	const userIndex = getUserIndex({membersList: event.membersList, user})
// 	if (userIndex === -1) {
// 		events[index].membersList.push({...user});
// 	}
// 	res.json({events: events});
// });
//
// app.post('/api/events/:id/logout', (req, res) => {
// 	const {id} = req.params;
// 	const {user} = req.body;
// 	const index = events.findIndex(event => event.id.toString() === id);
// 	const event = events[index];
// 	const userIndex = getUserIndex({membersList: event.membersList, user})
// 	if (userIndex !== -1) {
// 		events[index].membersList.splice(userIndex, 1);
// 	}
// 	res.json({events: events});
// });
