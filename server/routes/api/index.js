const express = require('express');
const {getUser, addUser} = require("./user");
const router = express.Router();

router.get('/user', getUser);
router.post('/user', addUser);

module.exports = router;