const express = require('express');
const {getGroup, addGroup} = require("./groups");
const {getUser, addUser} = require("./user");
const {getEvents, getEvent, addEvent} = require('./events');
const router = express.Router();

/**
 * User route
 */
router.get('/user', getUser);
router.post('/user', addUser);

/**
 * Group route
 */
router.get('/groups/current', getGroup);
router.post('/groups/current', addGroup);

/**
 * Events route
 */
router.get('/events', getEvents);
router.get('/events/:id', getEvent);
router.post('/events', addEvent);

module.exports = router;