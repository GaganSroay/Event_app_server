const admin = require("../../presistence/FirebaseAdmin");
const { getEventFromId } = require("../event/GetEvent");
const { getEventRole } = require("./GetEventRole");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");

const startEvent = async (eventId, authContext) => {
  const participant = await getEventRole(eventId, authContext);

  if (!participant) return { error: "user not found" };
  if (participant.role != "a") return { error: "You dont have permissions" };

  const updates = eventStartCallback(eventId);

  return updates;
};

const eventStartCallback = async (eventId) => {
  const eventDoc = await getEventFromId(eventId);
  const event = eventDoc.data();

  if (event.status != "upcomming") return { error: "event already started" };

  const updates = await eventRef.doc(eventDoc.id).update({ status: "started" });

  return updates;
};

module.exports = {
  startEvent,
  eventStartCallback,
};
