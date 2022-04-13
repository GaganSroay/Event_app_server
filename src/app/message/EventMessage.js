const admin = require("../../presistence/FirebaseAdmin");
const { getEventFromId } = require("../event/GetEvent");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");

const sendMessageToEvent = async (eventId, message, authContext) => {
  const payload = {
    message,
    user: authContext.user_id,
    timestamp: Date.now(),
  };

  const eventDoc = await getEventFromId(eventId);
  if (eventDoc.error) return eventDoc;

  const messageSent = await eventRef
    .doc(eventDoc.id)
    .collection("messages")
    .add(payload);
  return messageSent;
};

module.exports = sendMessageToEvent;
