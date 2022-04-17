const admin = require("../../presistence/FirebaseAdmin");
const { getEventFromId } = require("../event/GetEvent");
const getUser = require("../user/GetUser");
const checkAdmin = require("./CheckAdmin");
const { getEventRole } = require("./GetEventRole");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");
const userRef = firestore.collection("users");

const leaveEvent = async (eventId, authContext) => {
  const userId = authContext.user_id;

  const eventDoc = await getEventFromId(eventId);
  if (eventDoc.error) return eventDoc;

  const eventParticipantDoc = await eventRef
    .doc(eventDoc.id)
    .collection("participants")
    .where("user", "==", userId)
    .get();
  const userParticipantDoc = await userRef
    .doc(userId)
    .collection("events")
    .where("event_id", "==", eventId)
    .get();

  if (!eventParticipantDoc) return { error: "event participant not found" };
  if (!eventParticipantDoc.docs[0])
    return { error: "event participant not found" };
  if (!userParticipantDoc) return { error: "user participant not found" };
  if (!userParticipantDoc.docs[0])
    return { error: "user participant not found" };

  const eventParticipant = eventParticipantDoc.docs[0];
  const userParticipant = userParticipantDoc.docs[0];

  const eventUpdate = await eventParticipant.ref.delete();
  const userUpdate = await userParticipant.ref.delete();

  return {
    eventUpdate,
    userUpdate,
  };
};

module.exports = leaveEvent;
