'use strict';

const messageStorageServiceGateway = require('./../gateways/message-storage-service-gateway');
const notificationServiceGateway = require('./../gateways/notification-service-gateway');

async function sendMessage(req, res) {
  const message = req.body;
  try {
    await messageStorageServiceGateway.storeMessage(message);
  } catch (error) {
    res.status(500).send(error);
    return;
  }
  res.status(200).send(message.id);

  try {
    await sendNotifications(message);
  } catch (error) {
    messageStorageServiceGateway.markMessageAsFailed(message);
    return;
  }
  messageStorageServiceGateway.markMessageAsSucceeded(message);
}

function sendNotifications(message) {
  return Promise.all(message.recipients.map((recipient) => {
    return notificationServiceGateway.notify(recipient, message.body);
  }));
}

module.exports = {
  sendMessage: sendMessage
}
