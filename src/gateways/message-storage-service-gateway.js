'use strict';

var logger = require('log4js').getLogger('message-storage-service-gateway');

let messages = {};

function storeMessage(message) {
  logger.info("Storing message " + JSON.stringify(message));
  messages[message.id] = message;
  return Promise.resolve(message);
}

function markMessageAsFailed(message) {
  logger.info("Will mark message as failed " + JSON.stringify(message));
  messages[message.id].isSent = false;
  return Promise.resolve(messages[message.id]);
}

function markMessageAsSucceeded(message) {
  logger.info("Will mark message as succeeded " + JSON.stringify(message));
  messages[message.id].isSent = true;
  return Promise.resolve(messages[message.id]);
}

module.exports = {
  storeMessage: storeMessage,
  markMessageAsFailed: markMessageAsFailed,
  markMessageAsSucceeded: markMessageAsSucceeded
}
