const admin = require("../../presistence/FirebaseAdmin");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");
const messaging = admin.messaging();

const sendMessageNotification = async (message, eventDoc) => {
  const eventData = eventDoc.data();
  const notification = {
    notification: {
      title: `Message for ${eventData.event_name}`,
      body: message.message,
    },
    topic,
  };

  const response = await messaging.send(notification);
};

module.exports = sendMessageNotification;
