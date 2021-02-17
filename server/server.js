const express = require('express');
const bodyParser = require('body-parser');
const events = require('./mock');

const app = express();
const port = process.env.PORT || 5000;
const getUserIndex = ({membersList, user}) => membersList.findIndex(({userId}) => userId.toString() === user.userId.toString());

app.use(bodyParser.json());

app.get('/api/events', (req, res) => {
	console.log('/api/events');
	res.send({events: events})
});

app.post('/api/events/:id/signup', (req, res) => {
	const {id} = req.params;
	const {user} = req.body;
	const index = events.findIndex(event => event.id.toString() === id);
	const event = events[index];
	const userIndex = getUserIndex({membersList: event.membersList, user})
	if (userIndex === -1) {
		events[index].membersList.push({...user});
	}
	res.json({events: events});
});

app.post('/api/events/:id/logout', (req, res) => {
	const {id} = req.params;
	const {user} = req.body;
	const index = events.findIndex(event => event.id.toString() === id);
	const event = events[index];
	const userIndex = getUserIndex({membersList: event.membersList, user})
	if (userIndex !== -1) {
		events[index].membersList.splice(userIndex, 1);
	}
	res.json({events: events});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
