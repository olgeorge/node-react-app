'use strict';

var logger = require('log4js').getLogger('notification-service-gateway');

function notify(recipient, body) {
  logger.info("Accepting message to " + recipient);
  return Promise.resolve();
}

module.exports = {
  notify: notify
}
