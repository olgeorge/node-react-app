'use strict';

const routes = require('express').Router();
const sendMessageController = require('./controllers/send-message-controller');

routes.post('/sendMessage', sendMessageController.sendMessage);

module.exports = routes;
