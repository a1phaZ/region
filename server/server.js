const express = require('express');
const bodyParser = require('body-parser');
const mock = require('./mock');

const app = express();
const port = process.env.PORT || 5000;
const getUserIndex = ({membersList, user}) => membersList.findIndex(({userId}) => userId.toString() === user.userId.toString());

app.use(bodyParser.json());

app.get('/api/events', (req, res) => {
	console.log('/api/events');
	res.send({events: mock})
});

app.post('/api/data', (req, res) => {
	const {id, user} = req.body;
	const index = mock.findIndex(event => event.id.toString() === id);
	const event = mock[index];
	const userIndex = getUserIndex({membersList: event.membersList, user})
	if (userIndex === -1) {
		mock[index].membersList.push({...user});
	}
	res.json({events: mock});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
